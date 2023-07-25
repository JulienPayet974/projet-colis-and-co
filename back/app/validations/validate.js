const debug = require('debug')('colis:validate');
const BadInputError = require('../errors/BadInputError');

function validate(schema, dataSource) {
  debug('create a new validation middleware');
  return async (request, response, next) => {
    try {
      debug(schema.constructor.name);
      await schema.validateAsync(request[dataSource]);
      next();
    } catch (err) {
      console.log('Request data:', request[dataSource]); 
      console.log('Validation error:', err); 
      next(new BadInputError(err));
    }
  };
}

module.exports = validate;
