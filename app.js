// LIBRARY IMPORT
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// ROUTES
app.get('/api', (req, res) => {
	res.send({greeting: 'Hello World!'});
});

module.exports = app;