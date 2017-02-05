// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// Get config settings from .env file
const dotenv = require('dotenv');
dotenv.load();

// Get config settings from config file
const config = require('./config');

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.database || config.database);

// Create app
const app = express();

// Views
app.set('views', __dirname + '/views');
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

// Statics
app.use(express.static(__dirname + '/public'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

// Cross Origin middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET, OPTIONS, HEAD");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept");
  next();
});

// Define routes
app.use(require('./controllers'));

// Get port from environment and store in Express.
const port = process.env.serverPort || config.serverPort;
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));