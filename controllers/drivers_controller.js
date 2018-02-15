// LOCAL IMPORT
const Driver = require('../models/driver');

module.exports = {
	greeting(req, res) {
		res.send({greeting: 'Hello World!'});
	},
	create(req, res, next) {
		const driverProps = req.body;
		
		Driver.create(driverProps)
			.then((driver) => res.send(driver))
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
	}
};