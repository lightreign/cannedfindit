import express from 'express';
import bodyParser from 'body-parser';
import connectDatabase from './database';
import { Item, Location, Brand, Type, Product } from "./schema";

const server = express();

server.use(
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    express.static('dist'),
    apiMiddleware
);

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
    const filter = req.query.search || {};

    if (filter) {
        Object.keys(filter).map(key => {
           filter[key] = new RegExp(filter[key], 'i');
        });
    }

    // Do not show consumed items
    filter.consumed = null;

    try {
        const count = await Item.countDocuments(filter);
        res.header('X-Total-Count', count);

        const items = await Item.find(filter, null, { skip: skip, limit: limit, sort: { expiry: 1 } });

        res.status(200).send(items);
    } catch (error) {
        console.error(error);
        res.status(422)
            .send({error: "cannot list items"});
    }
});

server.get('/api/item/:id', async (req, res) => {
    try {
        const item = await Item.findOne({ _id: req.params.id });
        res.status(200).send(item);
    } catch (error) {
        console.error(error);
        res.status(404)
            .send({error: "cannot find item"});
    }
});

server.get('/api/brand', async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).send(brands);
    } catch (error) {
        console.error(error);
        res.status(422)
            .send({error: "cannot list brands"});
    }
});

server.get('/api/type', async (req, res) => {
    try {
        const types = await Type.find();
        res.status(200).send(types);
    } catch (error) {
        console.error(error);
        res.status(422)
            .send({ error: "cannot list types" });
    }
});

server.get('/api/location', async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).send(locations);
    } catch (error) {
        console.error(error);
        res.status(422)
            .send({ error: "cannot list locations" });
    }
});

server.get('/api/product', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.status(422)
            .send({ error: "cannot list products" });
    }
});

server.post('/api/item/new', async (req, res) => {
    const qty = req.body.qty || 1;
    const items = [];

    try {
        for (let i = 1; i <= qty; i++) {
            let newItem = await new Item(req.body.item);

            let error = newItem.validateSync();
            if (error) {
                throw new Error('Item has invalid data');
            }

            await newItem.save();
            items.push(newItem);
        }

        console.log('saved item');
        res.status(201).send(items);

    } catch (error) {
        console.error(error);
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

        console.log('saved new location');
        res.status(201).send(created);
    } catch (error) {
        console.error(error);
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

        console.log('saved new brand');
        res.status(201).send(created);
    } catch (error) {
        console.error(error);
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

        console.log('saved new type');
        res.status(201).send(created);
    } catch (error) {
        console.error(error);
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

        console.log('saved new product');
        res.status(201).send(created);
    } catch (error) {
        console.error(error);
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

        console.log('consumed item', item);
        res.status(200).send(item);
    } catch (error) {
        console.error(error);
        res.status(422)
            .send({ error: "could not consume item" });
    }
});

server.listen(4242, () => console.log('Server is running...'));
