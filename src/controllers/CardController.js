const mongoose = require('mongoose');

const CardInit = require('../models/Card');

const Card = mongoose.model('Card');
const List = mongoose.model('List');

module.exports = {
  async index(req, res) {
    const cards = await Card.find();
    return res.render('card.list.handlebars', {
      title: 'Cartões',
      cards,
    });
  },
  async show(req, res) {
    const card = await Card.findById(req.params.id);
    const allLists = await List.find();

    const lists = allLists.map((list) => {
      const newList = { ...list._doc };
      newList.isCardList = card._list.equals(newList._id);
      return newList;
    });

    console.log(lists);

    return res.render('card.create.handlebars', {
      title: `Editar Cartão: ${card.name}`,
      card,
      lists,
    });
  },
  form(req, res) {
    return res.render('card.create.handlebars', {
      title: 'Novo cartão',
      list: req.query.list,
    });
  },
  async store(req, res) {
    const list = await List.findById(req.body._list);
    if (!list) {
      res.send('error');
    }

    const card = await Card.create(req.body);
    if (!card) {
      res.send('error');
    }

    list.cards.push(card);
    list.save();

    return res.redirect('/lists');
  },
  async update(req, res) {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(card);
  },
  async destroy(req, res) {
    await Card.findByIdAndRemove(req.params.id);

    const lists = await List.find()
      .populate('cards');

    return res.render('lists', {
      title: 'Listas',
      lists,
    });
  },
};
