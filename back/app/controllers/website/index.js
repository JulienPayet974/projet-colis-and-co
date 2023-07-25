/**
 * Controller for handling website related requests
 * @namespace websiteController
*/
const websiteController = {
  /**
   * Redirects to the api documentation home page
   * @memberof websiteController
   * @function getHome
   * @param {Object} request - Express request object
   * @param {Object} response - Express response object
*/
  getHome: (_, res) => {
    res.redirect('/api-docs');
  },
};

module.exports = websiteController;
