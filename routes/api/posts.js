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
      const { tags } = req.body;
      let tags_saved = [];
      if (tags.length > 0) {
        tags_saved = tags.map((item) => item.id);
      }
      let post = await Post.create({
        title: req.body.title,
        coverImage: req.body.coverImage,
        content: req.body.content,
        user: req.user.id,
        tags: tags_saved,
      });
      await User.findByIdAndUpdate(req.user.id, {
        $addToSet: { posts: post._id },
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

// @route    PUT api/posts
// @desc     Edit  post
// @access   Private
router.put(
  '/edit/:id',
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
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      const { title, content, coverImage } = req.body;
      post.title = title;
      post.content = content;
      if (coverImage) {
        post.coverImage = coverImage;
      } else {
        post.coverImage = '';
      }
      await post.save();

      return res.json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate('user', ['avatar', 'name'])
      .populate('tags', ['tagName']);
    const usersCount = await User.estimatedDocumentCount();
    return res.json({ posts, usersCount });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get edited post by ID
// @access   Public
router.get('/edit/:id', checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select([
      'title',
      'content',
      'coverImage',
    ]);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    return res.json(post);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Public
router.get('/:id', checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', ['avatar', 'name'])
      .populate('tags', ['tagName', 'tagColor']);
    const profile = await Profile.findOne({
      user: post.user.id,
    }).select([
      'bio',
      'title',
      'locations',
      'date',
      'id',
      'user',
      'brand_color',
    ]);

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

// @route    GET api/posts/:id
// @desc     Get post by userId
// @access   Public
router.get('/user/:id', checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.find({ user: req.params.id })
      .sort({ date: -1 })
      .populate('user', ['avatar', 'name'])
      .populate('tags', ['tagName']);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    return res.json(post);
  } catch (err) {
    console.log('asdsd');
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

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { posts: req.params.id },
      $inc: { postCount: -1 },
    });
    await post.remove();

    const user = await User.find({ bookMarkedPosts: req.params.id });
    let i;
    let userLength = user.length;
    if (userLength > 0) {
      for (i = 0; i < userLength; ++i) {
        const index = user[i].bookMarkedPosts.indexOf(req.params.id);
        user[i].bookMarkedPosts.splice(index, 1);
        user[i].bookMarkedPostsCount = user[i].bookMarkedPostsCount - 1;
        await user[i].save();
      }
    }
    return res.status(200).json({ success: true, data: {} });
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
      post.likes = [req.user.id, ...post.likes];
    }

    await post.save();
    return res.status(200).json({ success: true, data: {} });
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
    const post = await Post.findById(req.params.id).populate('user', [
      'name',
      'avatar',
    ]);
    const user = await User.findById(req.user.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found!' });
    }
    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }
    let check = false;
    if (post.bookmarks.includes(req.user.id)) {
      const index = post.bookmarks.indexOf(req.user.id);
      post.bookmarks.splice(index, 1);
      post.bookmarksCount = post.bookmarksCount - 1;
    } else {
      post.bookmarksCount = post.bookmarksCount + 1;
      post.bookmarks = [req.user.id, ...post.bookmarks];
    }
    if (user.bookMarkedPosts.includes(req.params.id)) {
      check = true;
      const index = user.bookMarkedPosts.indexOf(req.params.id);
      user.bookMarkedPosts.splice(index, 1);
      user.bookMarkedPostsCount = user.bookMarkedPostsCount - 1;
    } else {
      user.bookMarkedPostsCount = user.bookMarkedPostsCount + 1;
      user.bookMarkedPosts = [req.params.id, ...user.bookMarkedPosts];
    }
    await post.save();
    await user.save();
    return res.json({
      data: {
        name: post.user.name,
        avatar: post.user.avatar,
        id: req.params.id,
        date: post.date,
        title: post.title,
        check: check,
      },
    });
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

// @route    POST api/posts/comment/:id/:coment_id
// @desc     Reply on a comment
// @access   Private
router.post(
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
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found!' });
      }
      if (!user) {
        return res.status(404).json({ msg: 'User not found!' });
      }
      let commentsLength = post.comments.length;
      let i;
      let getComments = [];
      for (i = 0; i < commentsLength; ++i) {
        if (post.comments[i].id === req.params.comment_id) {
          getComments = post.comments[i];
          break;
        }
      }
      const newComment = {
        text_reply: req.body.data,
        name_reply: user.name,
        avatar_reply: user.avatar,
        user_reply: req.user.id,
      };
      getComments.reply = [...getComments.reply, newComment];
      post.commentsCount = post.commentsCount + 1;
      await post.save();
      return res.json({
        commentsCount: post.commentsCount,
        reply: getComments.reply,
      });
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
    if (!post) {
      return res.status(404).json({ msg: 'Post not found!' });
    }
    // Pull out comment
    let check = false;
    let i;
    let postLength = post.comments.length;
    for (i = 0; i < postLength; ++i) {
      if (post.comments[i].id === req.params.comment_id) {
        if (post.comments[i].user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
        if (post.comments[i].reply.length > 0) {
          post.commentsCount =
            post.commentsCount - 1 - post.comments[i].reply.length;
        } else {
          post.commentsCount = post.commentsCount - 1;
        }
        post.comments.splice(i, 1);
        check = true;
        break;
      }
    }
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

// @route    DELETE api/posts/comment-reply/:id/:comment_id
// @desc     Delete reply comment
// @access   Private
router.delete(
  '/comment-reply/:id/:comment_id/:comment_reply_id',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found!' });
      }
      let check = false;
      let i;
      let j;
      let postLength = post.comments.length;
      for (i = 0; i < postLength; ++i) {
        if (post.comments[i].id === req.params.comment_id) {
          let subComtLength = post.comments[i].reply.length;

          for (j = 0; j < subComtLength; ++j) {
            if (post.comments[i].reply[j].id === req.params.comment_reply_id) {
              if (
                post.comments[i].reply[j].user_reply.toString() !== req.user.id
              ) {
                return res.status(401).json({ msg: 'User not authorized' });
              }
              post.commentsCount = post.commentsCount - 1;
              post.comments[i].reply.splice(j, 1);
              check = true;
              break;
            }
          }
        }
      }

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
      if (!post) {
        return res.status(404).json({ msg: 'Post not found!' });
      }
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

// @route    EDIT api/posts/comment/:id/:comment_id
// @desc     EDIT reply comment
// @access   Private

router.put(
  '/comment-reply/:id/:comment_id/:comment_reply_id',
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
      if (!post) {
        return res.status(404).json({ msg: 'Post not found!' });
      }
      const { data } = req.body;
      let check = false;
      let i;
      let j;
      let postLength = post.comments.length;
      for (i = 0; i < postLength; ++i) {
        if (post.comments[i].id === req.params.comment_id) {
          let subComtsLength = post.comments[i].reply.length;
          for (j = 0; j < subComtsLength; ++j) {
            if (post.comments[i].reply[j].id === req.params.comment_reply_id) {
              if (
                post.comments[i].reply[j].user_reply.toString() !== req.user.id
              ) {
                return res.status(401).json({ msg: 'User not authorized' });
              }
              post.comments[i].reply[j].text_reply = data;
              check = true;
              break;
            }
          }
        }
      }
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

module.exports = router;
