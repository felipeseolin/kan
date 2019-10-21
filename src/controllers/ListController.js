const mongoose = require('mongoose');

const ListInit = require('../models/List');
const CardInit = require('../models/Card');

const List = mongoose.model('List');
const Card = mongoose.model('Card');

module.exports = {
  async index(req, res) {

    const lists = await List.find();
    lists.cards = await Card.find();

    return res.render('lists', {
      title: 'Listas',
      lists
    });
  },
  async show(req, res) {
    const list = await List.findById(req.params.id);
    return res.json(list);
  },
  async store(req, res) {
    const list = await List.create(req.body);

    const lists = await List.find();
    return res.render('lists', {title: 'Listas', lists: lists });
  },
  async update(req, res) {
    const list = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(list);
  },
  async destroy(req, res) {
    await List.findByIdAndRemove(req.params.id);
    
    const lists = await List.find();
    return res.render('lists', {title: 'Listas', lists: lists });
  },
};
