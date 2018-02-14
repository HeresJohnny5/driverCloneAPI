// LIBRARY IMPORT
const assert = require('assert');
const expect = require('expect');
const request = require('supertest');
const mongoose = require('mongoose');

// LOCAL IMPORT
const app = require('../../app');
//const Driver = mongoose.model('driver');
const Driver = require('../../models/driver');

// TESTS
describe('Drivers controller', () => {
	it('POST request to /api/drivers creates a new driver', (done) => {
		Driver.count()
			.then(count => {
				request(app)
					.post('/api/drivers')
					.send({email: 'test@test.com'})
					.end((err, res) => {
						if(err) {
							return done(err);
						}
					
						Driver.count()
							.then(newCount => {
								assert(count + 1 === newCount);
								done();
							});

//						assert(res.body.newDriver.email === 'test@test.com');
//						assert(res.body.newDriver.driving === false);
//						done();
					});
			})
	});
});