const express =  require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 * @description Root route
 * @method GET
 */
route.get('/', services.homeRoutes);

/**
 * @description add_user route
 * @method GET / add_user
 */
route.get('/add-user', services.add_user)

/**
 * @description update_user route
 * @method GET / update_server
 */
route.get('/update-user', services.update_user)

//API
route.post('/api/users', controller.create)
route.get('/api/users', controller.find)
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)

module.exports = route