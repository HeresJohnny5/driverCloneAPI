// LIBRARY IMPORT
const mongoose = require('mongoose');

// SCHEMA
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
	emai: {
		type: String,
		required: true
	},
	driving: {
		type: Boolean,
		default: false
	}
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;