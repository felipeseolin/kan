const mongoose = require('mongoose');

const ListInit = require('../models/List');
const CardInit = require('../models/Card');
const BoardInit = require('../models/Board');

const List = mongoose.model('List');
const Board = mongoose.model('Board');
const Card = mongoose.model('Card');

module.exports = {
  async index(req, res) {
    const lists = await List.find()
      .populate('cards');

    return res.render('lists', {
      title: 'Listas',
      lists,
    });
  },
  async show(req, res) {
    const list = await List.findById(req.params.idlist);
    return res.render('list.create.handlebars', {
      title: list.name,
      boardId: req.params.idboard,
      formAction: `/lists/${req.params.idlist}`,
      list,
    });
  },
  form(req, res) {
    return res.render('list.create.handlebars', {
      title: 'Nova lista',
      boardId: req.params.id,
      formAction: '/lists/new',
    });
  },
  async store(req, res) {
    const board = await Board.findById(req.body._board);
    if (!board) {
      res.send('error');
    }

    const list = await List.create(req.body);
    if (!list) {
      return res.render('error');
    }

    board.lists.push(list);
    board.save();

    return res.redirect(`/boards/${req.body._board}`);
  },
  async update(req, res) {
    const list = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.redirect(`/boards/${req.body._board}`);
  },
  async destroy(req, res) {
    const list = await List.findByIdAndRemove(req.params.idlist);
    await Card.deleteMany({ _list: req.params.idlist });

    // Delete from board
    const board = await Board.findOne({ lists: list.id });
    board.lists = board.lists.filter((item) => !item.equals(req.params.idlist));
    board.save();

    return res.redirect(`/boards/${board.id}`);
  },
};
