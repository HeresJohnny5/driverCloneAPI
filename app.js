// LIBRARY IMPORT
const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

// LOCAL IMPORT
const routes = require('./routes/routes');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test') {
	mongoose.connect('mongodb://localhost:27017/driverAPI');
}

// MIDDLEWARE *** THIS MUST GO ABOVE THE ROUTE CALL ***
// assume any incoming requst is JSON and parse it into an object
app.use(bodyParser.json());

routes(app);

// MIDDLEWARE
app.use((err, req, res, next) => {
	res.status(422).send({error: err._message});
});

module.exports = app;