import process from 'process';
import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';
import connectDatabase from './database';
import { Item, Location, Brand, Type, Product, User } from "./schema";

const server = express();

server.use(
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    express.static('dist'),
    apiMiddleware
);

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: __dirname + '/../../server.log',
            level: 'debug',
        })
    ]
});

async function apiMiddleware(req, res, next) {
    await connectDatabase();

    if (req.url.match(/^\/?api/)) {
        res.append('Content-Type', 'application/json; charset=UTF-8');
    }

    next();
}

server.get(/^(?!\/?api).+$/, (req, res) => {
    res.send(`
    <html>
      <head>
        <title>CannedFindIt!</title>
        <link rel="stylesheet" href="/bundle.css">
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
        <link href="/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
        <link href="/apple-touch-icon-167x167.png" rel="apple-touch-icon" sizes="167x167" />
        <link href="/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/icon-hires.png" rel="icon" sizes="192x192" />
        <link href="/icon.png" rel="icon" sizes="128x128" />
      </head>
      <body>
        <div id="mountNode"></div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `)
});

server.get('/api/item', async (req, res) => {
    const limit = parseInt(req.query.perPage);
    const skip = req.query.page > 1 ? limit * (req.query.page - 1) : 0;
    const filter = req.query.search || null;
    let search = {};

    if (filter) {
        const terms = [];

        Object.keys(filter).map(key => {
            terms.push({ [key]: new RegExp(filter[key], 'i') });
        });

        search = { '$or': terms };
    }

    // Do not show consumed items
    search.consumed = null;

    try {
        const count = await Item.countDocuments(filter);
        res.header('X-Total-Count', count);

        const items = await Item.find(
            search,
            null,
            { skip: skip, limit: limit, sort: { expiry: 1 }
            });

        res.status(200).send(items);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({error: "cannot list items"});
    }
});

server.get('/api/item/:id', async (req, res) => {
    try {
        const item = await Item.findOne({ _id: req.params.id });
        res.status(200).send(item);
    } catch (error) {
        logger.error(error);
        res.status(404)
            .send({ error: "cannot find item" });
    }
});

server.get('/api/brand', async (req, res) => {
    try {
        const brands = await Brand.find({}, null, { sort: { 'name': 1 } });
        res.status(200).send(brands);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "cannot list brands" });
    }
});

server.get('/api/type', async (req, res) => {
    try {
        const types = await Type.find({}, null, { sort: { 'name': 1 } });
        res.status(200).send(types);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "cannot list types" });
    }
});

server.get('/api/location', async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).send(locations);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "cannot list locations" });
    }
});

server.get('/api/product', async (req, res) => {
    try {
        const products = await Product.find({}, null, { sort: { 'brand.name': 1 } });
        res.status(200).send(products);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "cannot list products" });
    }
});

server.get('/api/product/item/count', async (req, res) => {
    const limit = parseInt(req.query.perPage);
    const skip = req.query.page > 1 ? limit * (req.query.page - 1) : 0;

    const pipeline = [
        {
            $match: {
               consumed: { '$in': [ null, false ] }
            }
        },
        {
            $project: {
                _id: 0,
                description: {'$concat': ['$product.brand.name', ' ', '$product.type.name']},
                productType: "$product.type.name"
            }
        },
        {
            $group: {
                _id: "$productType",
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                _id: 1,
            }
        }
    ];

    try {
        const total = await Item.aggregate([ ...pipeline, { $count: 'count' } ]);
        res.header('X-Total-Count', total.shift().count);

        if (skip) {
            pipeline.push({ '$skip': skip });
        }

        if (limit) {
            pipeline.push({ '$limit': limit });
        }

        const counts = await Item.aggregate(pipeline);

        res.status(200).send(counts);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "cannot list products item counts" });
    }
});

server.post('/api/item/new', async (req, res) => {
    const qty = req.body.qty || 1;
    const items = [];

    if (qty > 20) {
        res.status(400).send({ error: 'quantity is above 20, this is not allowed.' });
        return;
    }

    try {
        for (let i = 1; i <= qty; i++) {
            let newItem = await new Item(req.body.item);

            let error = newItem.validateSync();
            if (error) {
                throw new Error(error);
            }

            await newItem.save();
            items.push(newItem);

            logger.debug('saved item: ' + newItem._id);
        }

        res.status(201).send(items);

    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "Could not add item(s) due to database error" });
    }
});

server.post('/api/location/new', async (req, res) => {
    const created = new Location(req.body.location);

    let error = created.validateSync();
    if (error) {
        res.status(422).send(error.errors);
        return;
    }

    try {
        await created.save();

        logger.info('saved new location: ' + created.name);
        res.status(201).send(created);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "duplicate location or other database problem" });
    }
});

server.post('/api/brand/new', async (req, res) => {
    const created = new Brand(req.body.brand);

    let error = created.validateSync();
    if (error) {
        res.status(422).send(error.errors);
        return;
    }

    try {
        await created.save();

        logger.info('saved new brand: ' + created.name);
        res.status(201).send(created);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "duplicate brand or other database problem" });
    }
});

server.post('/api/type/new', async (req, res) => {
    const created = new Type(req.body.type);

    let error = created.validateSync();
    if (error) {
        res.status(422).send(error.errors);
        return;
    }

    try {
        await created.save();

        logger.info('saved new type: ' + created.name);
        res.status(201).send(created);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "duplicate type or other database problem" });
    }
});

server.post('/api/product/new', async (req, res) => {
    const created = new Product(req.body.product);

    let error = created.validateSync();
    if (error) {
        res.status(422).send(error.errors);
        return;
    }

    try {
        await created.save();

        logger.debug('saved new product: ' + created._id);
        res.status(201).send(created);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "duplicate product or other database problem" });
    }
});

server.post('/api/item/consume', async (req, res) => {
    const item = await Item.findOne({ _id: req.body.id });

    if (!item) {
        res.status(404).send();
        return;
    }

    try {
        item.consumed = new Date();
        await item.save();

        logger.debug('consumed item: ' + item._id);
        res.status(200).send(item);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "could not consume item" });
    }
});

server.post('/api/item/unconsume', async (req, res) => {
    try {
        const item = await Item.findOne({ _id: req.body.id });

        item.consumed = null;
        await item.save();

        logger.debug('unconsumed item: ' + item._id);
        res.status(200).send(item);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "could not unconsume item" });
    }
});

server.get('/api/user/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        res.status(200).send(user);
    } catch (error) {
        logger.error(error);
        res.status(404)
            .send({ error: "cannot find user" });
    }
});

server.put('/api/user', async (req, res) => {
    let user;

    try {
        user = await User.findOne({ id: 1 });
        user.name = req.body.user.name;
    } catch (error) {
        user = new User({ id: 1, ...req.body.user });
    }

    let error = user.validateSync();
    if (error) {
        res.status(422).send(error.errors);
        return;
    }

    try {
        await user.save();

        logger.info('updated user: ' + user.name);
        res.status(201).send(user);
    } catch (error) {
        logger.error(error);
        res.status(422)
            .send({ error: "database problem when trying to update user" });
    }
});

process.on('uncaughtException', (err) => {
    logger.error(err.stack);
});

server.listen(4242, () => logger.info('Server is started...'));
