// Express module for creating web applications
const express = require('express');
// Router module for handling API requests
const apiRouter = require('./api');
// Router module for handling website requests.
const websiteRouter = require('./website');
// Creates an instance of the Express router
const router = express.Router();

/**
 * Mounts the API router on the '/api' route
*/
// Utilisation des routes pour l'API et swagger
router.use('/api', apiRouter);
/**
 * Mounts the website router on the '/' route
 */
router.use('/', websiteRouter);
// Exports the router instance
module.exports = router;
