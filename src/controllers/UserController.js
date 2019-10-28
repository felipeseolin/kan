const mongoose = require('mongoose');

const UserInit = require('../models/User');
const BoardInit = require('../models/Board');
const ListInit = require('../models/List');
const CardInit = require('../models/Card');

const User = mongoose.model('User');
const Board = mongoose.model('Board');
const List = mongoose.model('List');
const Card = mongoose.model('Card');

module.exports = {
  async store(req, res) {
    const user = await User.create(req.body);
    if (!user) {
      return res.render('errror');
    }
    return res.redirect('/boards');
  },
  form(req, res) {
    return res.render('user.create.handlebars', {
      title: 'Novo usuário',
      formAction: '/users/new',
    });
  },
};
