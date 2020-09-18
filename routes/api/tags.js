const express = require('express');
const router = express.Router();

const Tag = require('../../models/Tags');

function hexToRGB(h) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length === 4) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];

    // 6 digits
  } else if (h.length === 7) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
  }

  return 'rgb(' + +r + ',' + +g + ',' + +b + ')';
}
// @route    GET api/tags
// @desc     get tags
// @access   Public
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find().select(['tagName', 'tagColor']);
    const tags_convert = tags.map((tag) => ({
      _id: tag.id,
      tagName: tag.tagName,
      tagColor: hexToRGB(tag.tagColor),
    }));
    return res.json(tags_convert);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/tags
// @desc     get popular tags
// @access   Public
router.get('/popular-tags', async (req, res) => {
  try {
    const tags = await Tag.find().limit(16).select('tagName');
    return res.json(tags);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/tags
// @desc     get  tags for write post
// @access   Public
router.get('/write-tags', async (req, res) => {
  try {
    const tags = await Tag.find().select('tagName');
    return res.json(tags);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// test add tags
router.post('/', async (req, res) => {
  const { tagName, tagColor } = req.body;
  try {
    const tag = new Tag({
      tagName,
      tagColor,
    });
    await tag.save();
    return res.json(tag);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
