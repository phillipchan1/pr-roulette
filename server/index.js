var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
var parser = require('body-parser');
var mongoose    = require('mongoose');

// connect to database
require('./models/database');

// get method for parsing body
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// routes
var routes = require('./routes/app.routes.js');
app.use('/api', routes);

// static files
app.use('/', express.static('client/'));

app.listen(process.env.PORT || 80 || 8000, function () {
  console.log('Listening on port 8000');
});
