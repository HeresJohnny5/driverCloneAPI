// LOCAL IMPORT
const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
	// ROUTES
	app.get('/api', DriversController.greeting);
	
	// FIND DRIVERS
	app.get('/api/drivers', DriversController.index);
	
	// CREATE DRIVER
	app.post('/api/drivers', DriversController.create);
	
	// EDIT DRIVER
	app.put('/api/drivers/:id', DriversController.edit);
	
	// DELETE DRIVER
	app.delete('/api/drivers/:id', DriversController.delete);
};