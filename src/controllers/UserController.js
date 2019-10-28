const mongoose = require('mongoose');
const Bcrypt = require('bcrypt');

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
    req.body.password = Bcrypt.hashSync(req.body.password, 10);
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
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user) {
        return res.status(400).send('The user does not exist');
      }
      if (!Bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).send('The password is invalid');
      }
      res.send('The username and password combination is correct!');
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
