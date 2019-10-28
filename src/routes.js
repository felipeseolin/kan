const express = require('express');

const routes = express.Router();

const BoardController = require('./controllers/BoardController');
const ListController = require('./controllers/ListController');
const CardController = require('./controllers/CardController');
const UserController = require('./controllers/UserController');

routes.get('/', (req, res) => res.render('index', { title: 'Login' }));

// Users
routes.post('/users/login', UserController.login);
routes.get('/users/new', UserController.form);
routes.post('/users/new', UserController.store);

// Board
routes.get('/boards', BoardController.index);
routes.get('/boards/new', BoardController.form);
routes.post('/boards/new', BoardController.store);
routes.get('/boards/:id', BoardController.details);
routes.get('/boards/edit/:id', BoardController.show);
routes.post('/boards/edit/:id', BoardController.update);
routes.get('/boards/destroy/:id', BoardController.destroy);
// Lists
routes.get('/boards/:id/lists/new', ListController.form);
routes.post('/lists/new', ListController.store);
routes.get('/boards/:idboard/lists/:idlist', ListController.show);
routes.post('/lists/:id', ListController.update);
routes.get('/boards/:idboard/lists/destroy/:idlist', ListController.destroy);
// Cards
routes.get('/lists/:id/cards/new', CardController.form);
routes.post('/cards/new', CardController.store);
routes.get('/lists/:idlist/cards/:idcard', CardController.show);
routes.post('/cards/:id', CardController.update);
routes.get('/lists/:idlist/cards/destroy/:idcard', CardController.destroy);

module.exports = routes;
