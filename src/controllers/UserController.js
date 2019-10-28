const mongoose = require('mongoose');

const UserInit = require('../models/User');
const BoardInit = require('../models/Board');
const ListInit = require('../models/List');
const CardInit = require('../models/Card');

const User = mongoose.model('User');
const Board = mongoose.model('Board');
const List = mongoose.model('List');
const Card = mongoose.model('Card');

module.exports = {};
