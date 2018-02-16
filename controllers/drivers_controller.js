// LOCAL IMPORT
const Driver = require('../models/driver');

module.exports = {
	greeting(req, res) {
		res.send({greeting: 'Hello World!'});
	},
	index(req, res, next) {
		const {lng, lat} = req.query; 
		// you can't access the body object on a GET request
		// everything after the '?' in a URL is part of the query string
		// Express parses the query string, storing all the different properties onto 'req.query'
		
		Driver.geoNear(
			{type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
			{spherical: true, maxDistance: 200000} // in meters
		)
		.then((drivers) => res.send(drivers))
		.catch(next);
	},
	create(req, res, next) {
		const driverProps = req.body;
		
		Driver.create(driverProps)
			.then((drivers) => res.send(drivers))
			.catch(next); 
			// if something goes wrong with a promise it calls any function that is associated with 'catch'
	},
	edit(req, res, next) {
		const driverId = req.params.id;
		const driverProps = req.body;
		
		Driver.findByIdAndUpdate(driverId, driverProps)
			.then(() => Driver.findById(driverId))
			.then((driver) => res.send(driver))
			.catch(next);
	},
	delete(req, res, next) {
		const driverId = req.params.id;
		
		Driver.findByIdAndRemove(driverId)
			.then((driver) => res.status(204).send(driver))
			.catch(next);
	}
};