// importing router
const router = require('express').Router();

// import all API routes
const apiRoutes = require('./api');

// add prefix of `/api` to all API routes imported from the `api` directory
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h2>404 Page Not Found!</h2>');
});

module.exports = router;