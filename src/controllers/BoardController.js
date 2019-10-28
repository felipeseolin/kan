const mongoose = require('mongoose');

const BoardInit = require('../models/Board');
const ListInit = require('../models/List');
const CardInit = require('../models/Card');

const Board = mongoose.model('Board');
const List = mongoose.model('List');
const Card = mongoose.model('Card');

module.exports = {
  async index(req, res) {
    const boards = await Board.find();
    return res.render('board.list.handlebars', {
      title: 'Quadros',
      boards,
    });
  },
  form(req, res) {
    return res.render('board.create.handlebars', {
      title: 'Novo quadro',
      formAction: '/boards/new',
    });
  },
  async store(req, res) {
    const list = await Board.create(req.body);

    if (!list) {
      return res.render('errror');
    }

    return res.redirect('/boards');
  },
  async show(req, res) {
    const board = await Board.findById(req.params.id);

    return res.render('board.create.handlebars', {
      title: `Editar Quadro: ${board.name}`,
      formAction: `/boards/edit/${board.id}`,
      board,
    });
  },
  async update(req, res) {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.redirect('/boards');
  },
  async destroy(req, res) {
    await Board.findByIdAndRemove(req.params.id);
    const lists = await List.find({ _board: req.params.id });
    lists.map(async (list) => await Card.deleteMany({ _list: list._id }));
    await List.deleteMany({ _board: req.params.id });

    return res.redirect('/boards');
  },
  async details(req, res) {
    const board = await Board.findById(req.params.id)
      .populate({
        path: 'lists',
        populate: {
          path: 'cards',
        },
      });

    return res.render('board.details.handlebars', {
      title: `${board.name}`,
      board,
    });
  },
};
