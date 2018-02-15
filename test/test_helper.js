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
		.then(() => done())
		.catch(() => done());
});