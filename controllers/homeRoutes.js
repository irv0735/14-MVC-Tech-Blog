const router = require('express').Router();
const { BlogEntry, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogEntryData = await BlogEntry.findAll({
      include: [{ model: User }]
    });
    
    const blogEntries = blogEntryData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { 
      blogEntries, logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog-entries/:id', async (req, res) => {
  try {
    const blogData = await BlogEntry.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['user_name']
        },
        {
          model: Comment,
          include: [ 
            {
              model: User,
              attributes: ['user_name']
            },
          ],
          attributes: ['id', 'content', 'date_created', 'commentor_id']
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    res.render('blog-post', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogEntry }],
    });

    const user = userData.get({ plain: true });
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/create-account', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('create-account');
});

router.get('/blog-entry', withAuth, async (req, res) => {
  try {
    res.render('blog-entry');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
