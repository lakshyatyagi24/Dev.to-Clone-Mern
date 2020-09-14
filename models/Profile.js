const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  website: {
    type: String,
    default: '',
  },
  locations: {
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
    github: {
      type: String,
      default: '',
    },
  },
  brand_color: {
    type: String,
    default: '‎#002366',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('profile', ProfileSchema);
