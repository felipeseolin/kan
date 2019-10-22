const express = require('express');

const routes = express.Router();

const ListController = require('./controllers/ListController');
const CardController = require('./controllers/CardController');

routes.get('/', (req, res) => res.render('index', { title: 'Login' }));

// Lists
routes.get('/lists', ListController.index);
routes.get('/lists/new', ListController.form);
routes.post('/lists/new', ListController.store);
routes.get('/lists/:id', ListController.show);
routes.patch('/lists/:id', ListController.update);
routes.get('/lists/destroy/:id', ListController.destroy);
// Cards
routes.get('/cards', CardController.index);
routes.get('/cards/new', CardController.form);
routes.post('/cards/new', CardController.store);
routes.get('/cards/:id', CardController.show);
routes.patch('/cards/:id', CardController.update);
routes.get('/cards/destroy/:id', CardController.destroy);

module.exports = routes;
