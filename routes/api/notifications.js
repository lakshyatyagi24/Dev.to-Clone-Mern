const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Tags = require('../../models/Tags');
const Notification = require('../../models/Notification');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    GET api/notify
// @desc     Get all notification
// @access   Priavte

router.get('/', auth, async (req, res) => {
  try {
    const notify = await Notification.find({ me: req.user.id })
      .sort({ date: -1 })
      .populate('someone', ['avatar', 'name'])
      .populate('post', ['title']);
    res.json(notify);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});
module.exports = router;
