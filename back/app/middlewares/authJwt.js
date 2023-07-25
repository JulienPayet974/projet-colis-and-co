/**
 * Middleware to authenticate token
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {function} next - Callback function to move to next middleware
*/
const debug = require('debug')('colis:middlewareJwt');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
function authenticateToken(req, res, next) {
  // eslint-disable-next-line dot-notation
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Pour récupérer l'index 1 car le 0 est Bearer

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    debug(err);

    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;

    next();
  });
}

module.exports = authenticateToken;
