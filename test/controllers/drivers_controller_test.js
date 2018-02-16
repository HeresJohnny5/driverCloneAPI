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
	it('POST request to /api/drivers creates a new driver', done => {
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
					});
			});
	});
	
	it('PUT request to /api/drivers/id edits an existing driver', done => {
		const driver = new Driver({email: 'testedit@test.com', driving: false});
		
		driver.save()
			.then(() => {
				request(app)
					.put(`/api/drivers/${driver._id}`)
					.send({driving: true})
					.end((err, res) => {
						if(err) {
							return done(err);
						}
					
						Driver.findOne({email: 'testedit@test.com'})
							.then((driver) => {
								assert(driver.driving === true);
								done();
							});
					});
			});
	});
	
	it('DELETE request to /api/drivers/id deletes an existing driver', done => {
		const driver = new Driver({email: 'testdelete@test.com', driving: false});
		
		driver.save()
			.then(() => {
				request(app)
					.delete(`/api/drivers/${driver._id}`)
					.end((err, res) => {
						if(err) {
							return done(err);
						}
					
						Driver.findOne({email: 'testdelete@test.com'})
							.then((driver) => {
								assert(driver === null);
								done();
							});
					});
			});
	});
	
	xit('GET request to /api/drivers finds drivers in a location', done => {
		const seattleDriver = new Driver({
			email: 'seattletest@test.com',
			geometry: {
				type: 'Point',
				coordinates: [-122.4759902, 47.6147628]
			}
		});
		
		const miamiDriver = new Driver({
			email: 'miamitest@test.com',
			geometry: {
				type: 'Point',
				coordinates: [-80.253, 25.791]	
			}
		});
		
		Promise.all([seattleDriver.save(), miamiDriver.save()])
			.then(() => {
				request(app)
					.get('/api/drivers?lng=-80&lat=25')
					.end((err, res) => {
						if(err) {
							return done(err);
						}
					
						assert(res.body.length === 1);
						assert(res.body[0].obj.email === 'miamitest@test.com');
						done();
					});	
			});
	});
});