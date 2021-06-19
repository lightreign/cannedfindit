import express from 'express';
import bodyParser from 'body-parser';
import connectDatabase from './database';
import { Item } from "./schema";

const server = express();
server.use(
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    express.static('dist')
);

server.get('/*', (req, res) => {
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

    // newItem.save().then(() => {
    //     console.log('saved item');
    //     res.status(200).send();
    // });
});

server.listen(4242, () => console.log('Server is running...'));
