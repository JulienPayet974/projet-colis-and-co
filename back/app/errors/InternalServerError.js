const debug = require('debug')('colis:errors');

/** Class representing an internal server error. */
class InternalServerError extends Error {
  constructor(originalError) {
    super('Internal Server Error');
    if (originalError) {
      debug(originalError);
      this.originalError = originalError;
      if (this.originalError.code === '23505') {
        const column = this.originalError.detail.match(/^Key \((.+)\)=/)[1];
        const { table } = this.originalError;
        this.detail = `unique constraint violation on table '${table}', column '${column}'`;
      }
      if (this.originalError.code === '23503') {
        const { table } = this.originalError;
        this.detail = `foreign key constraint violation on table '${table}'`;
      }
    }
    this.httpStatusCode = 500;
  }
}

module.exports = InternalServerError;
