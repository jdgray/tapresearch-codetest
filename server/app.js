var express = require('express');
var bodyParser = require('body-parser');
var jsend = require('express-jsend');
var cors = require('cors');

var app = express();


//set CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

// api
app.use('/api/survey', require('./api/survey'));

// error handler
app.use(function(err, req, res, next) {
    console.log(err);
});

module.exports = app;
