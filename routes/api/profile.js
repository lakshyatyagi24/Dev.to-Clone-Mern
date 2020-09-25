const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { validationResult } = require('express-validator');
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const Notification = require('../../models/Notification');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile
// @desc     Update user profile
// @access   Private
function checkHex(color) {
  // check hex brand color if user type invalid
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
}
router.put('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    locations,
    website,
    bio,
    skills,
    title,
    education,
    brand_color,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    github,
  } = req.body;
  if (!checkHex(brand_color)) {
    brand_color = '#4169e1';
  }
  const profileFields = {
    locations,
    website:
      website && website !== '' ? normalize(website, { forceHttps: true }) : '',
    bio,
    skills,
    title,
    education,
    brand_color,
  };
  const socialfields = {
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    github,
  };

  for (const [key, value] of Object.entries(socialfields)) {
    if (value && value.length > 0)
      socialfields[key] = normalize(value, { forceHttps: true });
  }
  profileFields.social = socialfields;

  try {
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    );
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', checkObjectId('user_id'), async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found!' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndDelete({ user: req.user.id });

    // Remove user from others users
    const userFollowers = await User.find({ followers: req.user.id });
    let i;
    let follwersLength = userFollowers.length;
    if (follwersLength > 0) {
      for (i = 0; i < follwersLength; ++i) {
        const index = userFollowers[i].followers.indexOf(req.user.id);
        userFollowers[i].followers.splice(index, 1);
        userFollowers[i].followersCount = userFollowers[i].followersCount - 1;
        await userFollowers[i].save();
      }
    }
    const userFollowings = await User.find({ following: req.user.id });
    let j;
    let followingsLength = userFollowings.length;
    if (followingsLength > 0) {
      for (j = 0; j < followingsLength; ++j) {
        const index = userFollowings[j].following.indexOf(req.user.id);
        userFollowings[j].following.splice(index, 1);
        userFollowings[j].followingCount = userFollowings[j].followingCount - 1;
        await userFollowings[j].save();
      }
    }
    //  remove like and bookmarks from post
    const likes = await Post.find({ likes: req.user.id });
    let k;
    let likesLength = likes.length;
    if (likesLength > 0) {
      for (k = 0; k < likesLength; ++k) {
        const index = likes[k].likes.indexOf(req.user.id);
        likes[k].likes.splice(index, 1);
        likes[k].likesCount = likes[k].likesCount - 1;
        await likes[k].save();
      }
    }
    const bookmarks = await Post.find({ bookmarks: req.user.id });
    let l;
    let bookmarksLength = bookmarks.length;
    if (bookmarksLength > 0) {
      for (l = 0; l < bookmarksLength; ++l) {
        const index = bookmarks[l].bookmarks.indexOf(req.user.id);
        bookmarks[l].bookmarks.splice(index, 1);
        bookmarks[l].likesCount = bookmarks[l].likesCount - 1;
        await bookmarks[l].save();
      }
    }
    // delete all notifications about this user
    await Notification.deleteMany({
      $or: [
        { type: 'like' },
        { type: 'bookmark' },
        { type: 'comment' },
        { type: 'reply_comment' },
        { type: 'follow' },
        { type: 'post' },
      ],
      someone: req.user.id,
    });
    await User.findByIdAndDelete(req.user.id);

    return res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
