const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Tag = require('../../models/Tags');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    GET api/tags
// @desc     get tags
// @access   Public
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    return res.json(tags);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  const { tagName } = req.body;
  try {
    const tag = new Tag({
      tagName,
    });
    await tag.save();
    return res.json(tag);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
