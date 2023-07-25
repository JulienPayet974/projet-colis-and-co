const Joi = require('joi');

const schemas = {
  post: Joi.object({
    email: Joi.string().regex(/^[a-zA-Z0-9.!#$%&''+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/)
      .required(),
    password: Joi.string().required(),

  }).required(),
  put: Joi.object({
    email: Joi.string().regex(/^[a-zA-Z0-9.!#$%&''+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/),
    password: Joi.string(),

  }).required().min(1),
};

module.exports = schemas;
