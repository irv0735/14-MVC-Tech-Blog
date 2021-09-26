const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogEntryRoutes = require('./blogEntryRoutes');

router.use('/users', userRoutes);
router.use('/blog-entries', blogEntryRoutes);

module.exports = router;
