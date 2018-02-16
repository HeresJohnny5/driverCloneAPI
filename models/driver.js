// LIBRARY IMPORT
const mongoose = require('mongoose');

// SCHEMA
const Schema = mongoose.Schema;

// geojson.org
const PointSchema = new Schema({
	type: {type: String, default: 'Point'},
	coordinates: {type: [Number], index: '2dsphere'}
});

const DriverSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	driving: {
		type: Boolean,
		default: false
	},
	geometry: PointSchema
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;