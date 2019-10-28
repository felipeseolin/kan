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
    const card = await Card.findById(req.params.idcard);
    const currentList = await List.findById(req.params.idlist);
    const allLists = await List.find({ board: currentList.board });

    const lists = allLists.map((list) => {
      const newList = { ...list._doc };
      newList.isCardList = card._list.equals(newList._id);
      return newList;
    });

    return res.render('card.create.handlebars', {
      title: `Editar Cartão: ${card.name}`,
      formAction: `/cards/${card.id}`,
      card,
      lists,
    });
  },
  form(req, res) {
    return res.render('card.create.handlebars', {
      title: 'Novo cartão',
      formAction: '/cards/new',
      list: req.params.id,
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

    return res.redirect(`/boards/${list._board}`);
  },
  async update(req, res) {
    const listId = req.body.list;
    const cardId = req.params.id;
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);

    if (!card._list.equals(listId)) {
      const oldList = await List.findById(card._list);
      const newList = await List.findById(listId);

      oldList.cards = oldList.cards.filter((item) => !item.equals(cardId));
      oldList.save();

      newList.cards.push(cardId);
      newList.save();
    }

    const cardUpdate = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.redirect(`/boards/${list._board}`);
  },
  async destroy(req, res) {
    // Delelete card
    const card = await Card.findByIdAndRemove(req.params.idcard);
    // Delete from list
    const list = await List.findOne({ cards: card.id });
    list.cards = list.cards.filter((item) => !item.equals(req.params.idcard));
    list.save();

    return res.redirect(`/boards/${list._board}`);
  },
};
