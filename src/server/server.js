import express from 'express';
import bodyParser from 'body-parser';
import connectDatabase from './database';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App';

const server = express();
server.use(
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    express.static('dist')
);

server.get('/', (req, res) => {
    const initialMarkup = ReactDOMServer.renderToString(<App />);

    res.send(`
    <html>
      <head>
        <title>Inventory</title>
      </head>
      <body>
        <div class="container" id="mountNode">${initialMarkup}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `)
});

server.post('/item/new', async (req, res) => {
    let mongoose = await connectDatabase();

    const Item = mongoose.model('Item', { type: { name: String, location: String }, expiry: Date });
    const newItem = new Item(req.body.item);
    console.log('saved item');
    res.status(500).send();

    // newItem.save().then(() => {
    //     console.log('saved item');
    //     res.status(200).send();
    // });
});

server.listen(4242, () => console.log('Server is running...'));
