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
    default: '#363c44',
  },
  tagPostCount: {
    type: Number,
    default: 1,
  },
  tagDescription: {
    type: String,
    default: '',
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('tag', TagSchema);
