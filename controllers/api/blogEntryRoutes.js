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
  console.log("Made it to post route!");
  try {
    console.log("Attempting to create comment" + req.body);
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

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const projectData = await Project.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!projectData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
