import express from 'express';
import bodyParser from 'body-parser';
import connectDatabase from './database';
import {Item, Location, Brand, Type, Product} from "./schema";

const server = express();
server.use(
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    express.static('dist')
);

server.get('/', (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Inventory</title>
      </head>
      <body>
        <div class="container" id="mountNode"></div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `)
});

server.get('/brand', async (req, res) => {
    await connectDatabase();

    res.append('Content-Type', 'application/json; charset=UTF-8');

    const brands = await Brand.find();

    res.status(200).send(brands);
});

server.get('/type', async (req, res) => {
    await connectDatabase();

    res.append('Content-Type', 'application/json; charset=UTF-8');

    const types = await Type.find(); // TODO: add error handling

    res.status(200).send(types);
});

server.get('/location', async (req, res) => {
    await connectDatabase();

    res.append('Content-Type', 'application/json; charset=UTF-8');

    const locations = await Location.find(); // TODO: add error handling

    res.status(200).send(locations);
});

server.get('/product', async (req, res) => {
    await connectDatabase();

    res.append('Content-Type', 'application/json; charset=UTF-8');

    const products = await Product.find(); // TODO: add error handling

    res.status(200).send(products);
});

server.post('/item/new', async (req, res) => {
    await connectDatabase();

    const created = new Item(req.body.item);
    console.log('saved item');

    res.append('Content-Type', 'application/json; charset=UTF-8');

    let error = created.validateSync();
    if (error) {
        res.status(422).send(error.errors);
        return;
    }

    // await created.save();

    res.status(201).send(created);
});

server.post('/location/new', async (req, res) => {
    await connectDatabase();

    const created = new Location(req.body.location);

    res.append('Content-Type', 'application/json; charset=UTF-8');

    let error = created.validateSync();
    if (error) {
        res.status(422).send(error.errors);
        return;
    }

    await created.save().catch(() => {
        res
            .status(422)
            .send({ error: "duplicate location or other database problem" });
    });

    console.log('saved new location');

    res.status(201).send(created);
});

server.post('/brand/new', async (req, res) => {
    await connectDatabase();

    const created = new Brand(req.body.brand);

    res.append('Content-Type', 'application/json; charset=UTF-8');

    let error = created.validateSync();
    if (error) {
        res.status(422).send(error.errors);
        return;
    }

    await created.save().catch(() => {
        res
            .status(422)
            .send({ error: "duplicate brand or other database problem" });
    });

    console.log('saved new brand');

    res.status(201).send(created);
});

server.post('/type/new', async (req, res) => {
    await connectDatabase();

    const created = new Type(req.body.type);

    res.append('Content-Type', 'application/json; charset=UTF-8');

    let error = created.validateSync();
    if (error) {
        res.status(422).send(error.errors);
        return;
    }

    await created.save().catch(() => {
        res
            .status(422)
            .send({ error: "duplicate type or other database problem" });
    });

    console.log('saved new type');

    res.status(201).send(created);
});

server.post('/product/new', async (req, res) => {
    await connectDatabase();

    const created = new Product(req.body.product);

    res.append('Content-Type', 'application/json; charset=UTF-8');

    let error = created.validateSync();
    if (error) {
        res.status(422).send(error.errors);
        return;
    }

    await created.save().catch(() => {
        res
            .status(422)
            .send({ error: "duplicate product or other database problem" });
    });

    console.log('saved new product');

    res.status(201).send(created);
});

server.listen(4242, () => console.log('Server is running...'));
