const router = require('express').Router();
const { BlogEntry, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Add new Blog Post
router.post('/', withAuth, async (req, res) => {
  try {
    const newEntry = await BlogEntry.create({
      ...req.body,
      author_id: req.session.user_id,
    });

    res.status(200).json(newEntry);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Add new comment to existing Blog Post
router.post('/:id/add-comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      entry_id: req.params.id,
      commentor_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
