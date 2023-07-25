// Import the 'debug' function from the 'debug' module and set the namespace to 'colis: controllers' (see https://www.npmjs.com/package/debug)

const debug = require('debug')('colis:controllers');

/**
 * Class representing an abstract core controller.
 */
class CoreController {
  static dataMapper;

  /**
   * Finds all the data from the database using the dataMapper and returns it as a JSON response
   * @async
   * @function findAll
   * @param {*} _
   * @param {object} response
   */
  async findAll(_, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} findAll`);
    // Waits for the dataMapper to find all the data in the database
    const results = await this.constructor.dataMapper.findAll();
    // Sends the results as a JSON response.
    response.json(results);
  }

  /**
   * Finds a specific record from the database by its primary key and returns it as JSON or a 204 status if not found
   * @async
   * @function findByPk
   * @param {object} request - The request object containing the ID of the record to find
   * @param {object} response - The response objec
   * @returns
   */

  async findByPk(request, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} findByPk`);
    // Extracts the ID parameter from the request
    const { id } = request.params;
    // Logs a debug message with the ID being searched for.
    debug(`findByPk called with ID: ${id}`);
    // Searches for the record in the database by its primary key
    const results = await this.constructor.dataMapper.findByPk(id);
    // If a matching record is found, sends it as a JSON response
    if (results) {
      return response.json(results);
    }
    // If no matching record is found, returns a 204 No Content status code
    return response.status(204).send();
  }

  /**
   * Creates a new record in the table using the data provided in the request body and return it as JSON
   * @async
   * @function create
   * @param {object} request - The request object containing the data for the new record
   * @param {object} response - The response object
   */
  async create(request, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} create`);
    // Extracts the data for the new record from the request body
    const createObj = request.body;
    // Creates the new record in the database using the dataMapper
    const createdObj = await this.constructor.dataMapper.create(createObj);
    // Sends the newly created record as a JSON response with a 201 Created status code
    response.status(201).json(createdObj);
  }

  /**
   * Updates a record in the database with new data provided in the request body and returns it as a JSON response
   * @async
   * @function update
   * @param {object} request - The request object containing the ID of the record to update and the new data
   * @param {object} response - The response object
   */
  async update(request, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} updated`);
    // Extracts the ID parameter from the request
    const { id } = request.params;
    // Extracts the new data for the record from the request body
    const modObject = request.body;
    // Updates the record in the database using the dataMapper
    const modifiedItem = await this.constructor.dataMapper.update(id, modObject);
    // Sends the modified record as a JSON response
    response.json(modifiedItem);
  }

  /**
   * Deletes a record from the database by its ID and return a 204 status
   * @async
   * @function delete
   * @param {object} request - The request object containing the ID of the record to delete
   * @param {object} response - The response object
   * @returns
   */
  async delete(request, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} delete`);
    // Extracts the ID parameter from the request
    const { id } = request.params;
    // Deletes the record from the database using the dataMapper
    await this.constructor.dataMapper.delete(id);
    // Sends a 204 No Content response
    return response.status(204).send();
  }
}

module.exports = CoreController;
