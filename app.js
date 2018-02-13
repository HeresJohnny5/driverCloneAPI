// LIBRARY IMPORT
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// LOCAL IMPORT
const routes = require('./routes/routes');

routes(app);

module.exports = app;