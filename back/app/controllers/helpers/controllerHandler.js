const debug = require('debug')('colis:controllers');
/**
 * Wraps a controller function with error handling
 * @param {function} controller - the controller function to wrap
 * @returns {function} - the wrapped controller function with error handling
*/
function controllerHandler(controller) {
  debug(`create new controller with error handling for ${controller.name}`);
  // Returns an async function that takes the request, response, and next middleware function
  return async (req, res, next) => {
    try {
      // Calls the provided controller function with the request, response, and next middleware function
      await controller(req, res, next);
    } catch (err) {
      // If an error is thrown, passes it to the next middleware function for error handling
      next(err);
    }
  };
}
module.exports = controllerHandler;
