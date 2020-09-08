const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
  likesCount: {
    type: Number,
    default: 0,
  },
  bookmarks: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
  bookmarksCount: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  commentsCount: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', PostSchema);
