var express = require('express');
var app = express();

var products = require('./routes/products');

app.use('/products', products);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world express.js is main');
}).listen(3000);