const Joi = require('joi');

const schemas = {
  post: Joi.object({
    email: Joi.string().regex(/^[a-zA-Z0-9.!#$%&''+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/)
      .required(),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    address: Joi.string().required(),
    comp_address: Joi.string(),
    zipcode: Joi.string().pattern(/^0[1-9]\d{3}$|^20[1-2]\d{2}$|^20300$|^[13-8]\d{4}$|^9[0-6]\d{3}$|^97[1-6]\d{2}$|^98[4678]\d{2}$|^9{5}$/).required(),
    city: Joi.string().required(),
    birth_date: Joi.string(),
    phone_number: Joi.string().required(),
    carrier: Joi.boolean(),
    identity_verified: Joi.boolean(),
    role: Joi.string().default('user'),
  }).required(),
  put: Joi.object({
    email: Joi.string().regex(/^[a-zA-Z0-9.!#$%&''+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/),
    password: Joi.string(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    address: Joi.string(),
    comp_address: Joi.string(),
    zipcode: Joi.string().pattern(/^0[1-9]\d{3}$|^20[1-2]\d{2}$|^20300$|^[13-8]\d{4}$|^9[0-6]\d{3}$|^97[1-6]\d{2}$|^98[4678]\d{2}$|^9{5}$/),
    city: Joi.string(),
    birth_date: Joi.string(),
    phone_number: Joi.string(),
    carrier: Joi.boolean(),
    identity_verified: Joi.boolean(),
    role: Joi.string(),
  }).required().min(1),
};

module.exports = schemas;
