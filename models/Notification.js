const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotifySchema = new Schema({
  me: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  someone: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'post',
    required: true,
  },
  type: {
    type: String,
    enum: ['like', 'bookmark', 'comment', 'reply_comment', 'post'],
    required: true,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('notification', NotifySchema);
