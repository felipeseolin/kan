const mongoose = require('mongoose');

const ListInit = require('../models/List');
const CardInit = require('../models/Card');

const List = mongoose.model('List');
const Card = mongoose.model('Card');

module.exports = {
  async index(req, res) {
    const lists = await List.find();

    lists.map((list) => console.log(list));

    return res.render('lists', {
      title: 'Listas',
      lists,
    });
  },
  async show(req, res) {
    const list = await List.findById(req.params.id);
    return res.render('list', {
      title: list.name,
      list,
    });
  },
  form(req, res) {
    return res.render('list.create.handlebars', {
      title: 'Nova lista',
    });
  },
  async store(req, res) {
    const list = await List.create(req.body);

    if (!list) {
      return res.render('errror');
    }

    return res.redirect('/lists');
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
    return res.render('lists', {
      title: 'Listas',
      lists,
    });
  },
};
