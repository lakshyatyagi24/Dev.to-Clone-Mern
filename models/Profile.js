const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  followings: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
    },
  ],
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
    },
  ],
  website: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  skills: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  education: {
    type: String,
    default: '',
  },
  social: {
    youtube: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    facebook: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('profile', ProfileSchema);
