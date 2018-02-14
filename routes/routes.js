// LOCAL IMPORT
const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
	// ROUTES
	app.get('/api', DriversController.greeting);
	
	// CREATE DRIVER
	app.post('/api/drivers', DriversController.create);
};