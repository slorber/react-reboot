const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');


const ReactReboot = require("./src/lib/react-reboot");



const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({
  dev,
  dir: './src'
});

const handle = app.getRequestHandler();



app.prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());


    server.post('/transform', (req, res) => {
      const input = req.body.input;
      if ( !input ) {
        res.status(400).send('no input');
      }
      else {
        try {
          const {output,logger} = ReactReboot.transform(input);
          res.set('Content-Type', 'application/json').status(200).send({output,logger});
        }
        catch(e) {
          res.status(400).send(e.message);
        }
      }
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });