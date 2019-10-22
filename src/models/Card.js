const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  listId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

mongoose.model('Card', CardSchema);
