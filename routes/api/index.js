// connecting routes to server
const router = require('express').Router();
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');

// add prefix
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;