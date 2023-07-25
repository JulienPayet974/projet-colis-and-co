const debug = require('debug')('colis:errors');
const InternalServerError = require('../InternalServerError');

/* eslint-disable-next-line */
const errorHandler = (error, request, response, next) => {
  if (!error.httpStatusCode) {
    /* eslint-disable-next-line */
      error = new InternalServerError(error);
  }
  const responseObject = { message: error.message };
  if (process.env.NODE_ENV === 'development' && error.detail) {
    responseObject.detail = error.detail;
  }
  response
    .status(error.httpStatusCode)
    .render('error', { error: responseObject.message, status: error.httpStatusCode, detail: responseObject?.detail });
  debug(error.message, { detail: error?.detail });
};

module.exports = errorHandler;
