const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('content', 'Content is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id,
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: { posts: post._id },
        $inc: { postCount: 1 },
      });
      post = await post.populate('user', ['avatar', 'name']).execPopulate();

      return res.json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate('user', ['avatar', 'name']);
    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', [
      'avatar',
      'name',
    ]);
    const profile = await Profile.findOne({
      user: post.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    if (!profile) {
      return res.status(404).json({ msg: 'User not found' });
    }

    return res.json({ post, profile });
  } catch (err) {
    console.error(err.message);

    return res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    return res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    return res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.likes.includes(req.user.id)) {
      const index = post.likes.indexOf(req.user.id);
      post.likes.splice(index, 1);
      post.likesCount = post.likesCount - 1;
    } else {
      post.likesCount = post.likesCount + 1;
      post.likes = [...post.likes, req.user.id];
    }

    await post.save();

    return res
      .status(200)
      .json({ likes: post.likes, likesCount: post.likesCount });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/bookmarks/:id
// @desc     Get bookmarks
// @access   Private
router.put('/bookmarks/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found!' });
    }
    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    if (post.bookmarks.includes(req.user.id)) {
      const index = post.bookmarks.indexOf(req.user.id);
      post.bookmarks.splice(index, 1);
      post.bookmarksCount = post.bookmarksCount - 1;
    } else {
      post.bookmarksCount = post.bookmarksCount + 1;
      post.bookmarks = [...post.bookmarks, req.user.id];
    }
    await post.save();
    if (user.bookMarkedPosts.includes(req.params.id)) {
      const index = user.bookMarkedPosts.indexOf(req.params.id);
      user.bookMarkedPosts.splice(index, 1);
      user.bookMarkedPostsCount = user.bookMarkedPostsCount - 1;
    } else {
      user.bookMarkedPostsCount = user.bookMarkedPostsCount + 1;
      user.bookMarkedPosts = [...user.bookMarkedPosts, req.params.id];
    }
    await user.save();
    return res
      .status(200)
      .json({ bookmarks: post.bookmarks, bookmarksCount: post.bookmarksCount });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  [
    auth,
    checkObjectId('id'),
    [check('text', 'Text is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments = [newComment, ...post.comments];
      post.commentsCount = post.commentsCount + 1;

      await post.save();

      return res.json({
        comments: post.comments,
        commentsCount: post.commentsCount,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    EDIT api/posts/comment/:id/:comment_id
// @desc     EDIT comment
// @access   Private

router.put(
  '/comment/:id/:comment_id',
  [
    auth,
    checkObjectId('id'),
    [check('data', 'Text is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await Post.findById(req.params.id);
      const { data } = req.body;
      let check = false;
      let i;
      let postLength = post.comments.length;
      for (i = 0; i < postLength; ++i) {
        if (post.comments[i].id === req.params.comment_id) {
          if (post.comments[i].user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
          }
          post.comments[i].text = data;
          check = true;
          break;
        }
      }
      // Make sure comment exists
      if (!check) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }

      await post.save();

      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Pull out comment
    let check = false;
    let i;
    let postLength = post.comments.length;
    for (i = 0; i < postLength; ++i) {
      if (post.comments[i].id === req.params.comment_id) {
        if (post.comments[i].user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
        post.commentsCount = post.commentsCount - 1;
        post.comments.splice(i, 1);
        check = true;
        break;
      }
    }
    // Make sure comment exists
    if (!check) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    await post.save();

    return res.json({
      commentsCount: post.commentsCount,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
