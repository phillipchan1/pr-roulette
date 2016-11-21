// dependencies
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
var parser = require('body-parser');
var mongoose  = require('mongoose');
var config = require('./config.js');
var router = express.Router();

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

// direct all other routes to client-side app
app.all('/*', function ( req, res ) {
    res
        .status( 200 )
        .set( { 'content-type': 'text/html; charset=utf-8' } )
        .sendFile(process.cwd() + '/client/index.html');
});

app.listen(config.port, function () {
  console.log(`Listening on port ${config.port}`);
});
