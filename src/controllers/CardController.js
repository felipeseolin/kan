const mongoose = require('mongoose');

const CardInit = require('../models/Card');

const Card = mongoose.model('Card');

module.exports = {
  async index(req, res) {
    const cards = await Card.find();
    return res.render('cards', {
      title: 'Cardas',
      cards,
    });
  },
  async show(req, res) {
    const card = await Card.findById(req.params.id);
    return res.json(card);
  },
  async store(req, res) {
    const card = await Card.create(req.body);
    res.send();
  },
  async update(req, res) {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(card);
  },
  async destroy(req, res) {
    await Card.findByIdAndRemove(req.params.id);
    
    const cards = await Card.find();
    return res.render('cards', {title: 'Cardas', cards: cards });
  },
};
