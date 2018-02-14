// LIBRARY IMPORT
const assert = require('assert');
const expect = require('expect');
const request = require('supertest');

// LOCAL IMPORT
const app = require('../app');

// TESTS
describe('The express app', () => {
	it('Handles a GET request to /api', (done) => {
		request(app)
			.get('/api')
			.end((err, res) => {
				if(err) {
					return done(err);
				}
			
				assert(res.body.greeting === 'Hello World!');
				done();
			});
	});
});