const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  tagName: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    maxlength: 32,
  },
  tagColor: {
    type: String,
    trim: true,
    required: true,
    default: '#000',
  },
  tagPostCount: {
    type: Number,
    required: true,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('tag', TagSchema);
