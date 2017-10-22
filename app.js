const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var express = require('express');
var app = express();
var products = require('./routes/products');

app.use('/products', products);

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World\n');

  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>Hello, World!</h1></body></html>')

  //res.setHeader('Content-Type', 'application/json');
  //const responseBody = { headers, method, url, body };
  //res.write(JSON.stringify(responseBody));
  //res.end();

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});