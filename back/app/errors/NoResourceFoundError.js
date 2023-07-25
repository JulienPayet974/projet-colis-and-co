/** Class representing a no resource found error. */
class NoResourceFoundError extends Error {
  constructor() {
    super('No resource found');
    this.httpStatusCode = 404;
  }
}

module.exports = NoResourceFoundError;
