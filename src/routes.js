const express = require('express');

const routes = express.Router();

const ListController = require('./controllers/ListController');

routes.get('/', (req, res) => res.render('index', { title: 'Login' }));

routes.get('/lists', ListController.index);
routes.get('/lists/:id', ListController.show);
routes.post('/lists', ListController.store);
routes.patch('/lists/:id', ListController.update);
routes.get('/lists/destroy/:id', ListController.destroy);

module.exports = routes;
