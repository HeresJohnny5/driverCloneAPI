// LIBRARY IMPORT
const mongoose = require('mongoose');

before(done => {
	mongoose.connect('mongodb://localhost:27017/driverAPI_test');
	
	var db = mongoose.connection;
	db.on('error', error => {
		console.warn('Warning:', error);
	})
	db.once('open', () => done())
});

beforeEach(done => {
	const {drivers} = mongoose.connection.collections;
	
	drivers.drop()
		// before any test is run, a index is in place over geometry.coordinates on the driver collection. Every time the collection is droppped, immediately recreate the index
		.then(() => drivers.ensureIndex({
			'geometry.coordinates': '2dsphere'
		}))
		.then(() => done())
		.catch(() => done());
});