const express = require('express');

const routes = express.Router();

const BoardController = require('./controllers/BoardController');
const ListController = require('./controllers/ListController');
const CardController = require('./controllers/CardController');

routes.get('/', (req, res) => res.render('index', { title: 'Login' }));

// Board
routes.get('/boards', BoardController.index);
routes.get('/boards/new', BoardController.form);
routes.post('/boards/new', BoardController.store);
routes.get('/boards/edit/:id', BoardController.show);
routes.post('/boards/edit/:id', BoardController.update);
routes.get('/boards/destroy/:id', BoardController.destroy);
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
routes.delete('/cards/destroy/:id', CardController.destroy);

module.exports = routes;
