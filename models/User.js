const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    followers: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
    followersCount: {
      type: Number,
      default: 0,
    },
    following: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
    followingCount: {
      type: Number,
      default: 0,
    },
    posts: [{ type: mongoose.Schema.ObjectId, ref: 'post' }],
    postCount: {
      type: Number,
      default: 0,
    },
    bookMarkedPosts: [{ type: mongoose.Schema.ObjectId, ref: 'post' }],
    bookMarkedPostsCount: {
      type: Number,
      default: 0,
    },
    resetPasswordLink: {
      data: String,
      default: '',
    },
  },
  { timestamps: true }
);

UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('user', UserSchema);
