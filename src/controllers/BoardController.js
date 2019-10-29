const mongoose = require('mongoose');

const BoardInit = require('../models/Board');
const ListInit = require('../models/List');
const CardInit = require('../models/Card');

const Board = mongoose.model('Board');
const List = mongoose.model('List');
const Card = mongoose.model('Card');

function validate(name, description) {
  let errors = [];

  if (!name || name.trim().length === 0) {
    errors = [...errors, 'Um nome deve ser dado ao quadro.'];
  }
  if (name && name.length > 100) {
    errors = [...errors, 'O nome deve ter ao máximo 100 caracteres.'];
  }
  if (name && name.length < 5) {
    errors = [...errors, 'O nome deve ter ao mínimo 5 caracteres.'];
  }
  if (description && description.length > 250) {
    errors = [...errors, 'A descrição deve ter ao máximo 250 caracteres.'];
  }

  return errors;
}

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
    // Validation
    const errors = validate(req.body.name, req.body.description);
    if (errors.length > 0) {
      req.flash('error', errors);
      return res.redirect('/boards/new');
    }
    // Create Board
    const board = await Board.create(req.body);
    // Verify if the board is saved
    if (!board) {
      req.flash('error', ['Ocorreu um erro ao salvar o quadro, tente novamente.']);
      return res.redirect('/boards/new');
    }

    return res.redirect('/boards');
  },
  async show(req, res) {
    const board = await Board.findById(req.params.id);

    return res.render('board.create.handlebars', {
      title: `Editar: ${board.name}`,
      formAction: `/boards/edit/${board.id}`,
      board,
    });
  },
  async update(req, res) {
    // Validation
    const errors = validate(req.body.name, req.body.description);
    if (errors.length > 0) {
      req.flash('error', errors);
      return res.redirect(`/boards/edit/${req.params.id}`);
    }
    // Update Board
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // Verify if the board is saved
    if (!board) {
      req.flash('error', ['Ocorreu um erro ao salvar o quadro, tente novamente.']);
      return res.redirect('/boards/new');
    }

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
