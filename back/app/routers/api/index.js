/**
 * @fileoverview Router for the API endpoints
 * @module routes/api/index
 * @requires express
 * @requires ./users
 * @requires ./delivery
 * @requires ../../controllers/api
 * @requires ../../errors/NoResourceFoundError
 * @requires ../../errors/helpers/apiErrorHandler
*/
const express = require('express');
const usersRouter = require('./users');
const deliveryRouter = require('./delivery');
const { apiController } = require('../../controllers/api');
const NoResourceFoundError = require('../../errors/NoResourceFoundError');
const apiErrorHandler = require('../../errors/helpers/apiErrorHandler');

const router = express.Router();

router.all('/', apiController.getHome);

router.use('/deliveries', deliveryRouter);
router.use('/users', usersRouter);

router.use((_, res, next) => {
  next(new NoResourceFoundError());
});

router.use(apiErrorHandler);

module.exports = router;
