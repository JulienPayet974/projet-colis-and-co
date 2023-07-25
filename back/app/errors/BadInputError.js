/** Class representing a bad input error. */
class BadInputError extends Error {
  constructor(originalError) {
    super('Bad input');
    if (originalError) {
      this.originalError = originalError;
      this.detail = this.originalError.details[0].message;
    }
    this.httpStatusCode = 400;
  }
}

module.exports = BadInputError;
