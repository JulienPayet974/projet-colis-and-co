const debug = require('debug')('colis:controllers');
const CoreController = require('./CoreController');
const DeliveryDataMapper = require('../../models/deliveryDataMapper');
require('dotenv').config();
const cloudinary = require('../helpers/imageUpload');
const fse = require('fs-extra');

/** Class representing a delivery controller. */
class DeliveryController extends CoreController {
  static dataMapper = DeliveryDataMapper;

  /**
   * Creates an instance of DeliveryController.
   * @memberof DeliveryController
   */
  constructor() {
    super();

    debug('deliveryController created');
  }

  /**
   * Retrieves a list of deliveries from the database, paginated and limited, and returns them as a JSON response
   * @async
   * @function findAllDeliveries
   * @param {object} request - The request object containing the page number for pagination
   * @param {object} response - The response object.
   * @memberof DeliveryController
   */
  async findAllDeliveries(request, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} findAllDeliveries`);
    // Extracts the page number from the query parameter, defaults to 1 if not provided
    const page = Number(request.query.page) || 1;
    // Sets the limit for number of records to retrieve
    const limit = 100;
    // Retrieves the deliveries from the database using the dataMapper
    const results = await this.constructor.dataMapper.findAllDeliveries(
      page,
      limit
    );
    // Sends the results as a JSON response
    response.json(results);
  }

  /**
   * Creates a new delivery record in the database with an optional image URL and returns the created record as a JSON response
   * @async
   * @function createDelivery
   * @param {Object} request - The HTTP request object
   * @param {Object} request.file - The file object containing the optional image file
   * @param {Object} request.body - The delivery information
   * @param {Object} response - The HTTP response object
   * @memberof DeliveryController
   */
  async createDelivery(request, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} createDelivery`);

    // Upload into Cloudinary
    let imageUrl = '';
    if (request.file) {
      const result = await cloudinary.uploader.upload(request.file.path, {
        public_id: `${request.file.filename}`,
        width: 500,
        height: 500,
        crop: 'fill',
      });
      imageUrl = result.url;

      // Remove image from local storage
      await fse.remove(request.file.path);
    }

    const delivery = request.body;
    const createdDelivery = await this.constructor.dataMapper.createDelivery(
      delivery,
      imageUrl
    );

    response.json(createdDelivery);
  }

  /**
   * Updates a delivery with the given ID using the provided updates and returns the updated record as a JSON response
   * @async
   * @function updateDeliveryById
   * @param {Object} request - The HTTP request object
   * @param {integer} request.params.id - The ID of the delivery to update
   * @param {Object} request.body - The delivery data to use for updating
   * @param {Object} response - The HTTP response object.
   * @returns {Object} Returns a JSON object containing the updated delivery information.
   * @memberof DeliveryController
   */
  async updateDeliveryById(request, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} updateDeliveryById`);
    // Extracts the ID of the delivery to update from the request parameters
    const deliveryId = request.params.id;
    // Extracts the updates to apply to the delivery record from the request body
    const updates = request.body;
    // Updates the delivery record in the database using the dataMapper
    const updatedCarrier = await this.constructor.dataMapper.updateDeliveryById(
      deliveryId,
      updates
    );
    // Sends the updated delivery record as a JSON response
    return response.json(updatedCarrier);
  }

  /**
   * Searches for delivery records in the database by city or zipcode and returns the matching records as a JSON response
   * @async
   * @function findByCityOrZipcode
   * @param {Object} request - The HTTP request object
   * @param {string} request.query.city - The city to search for deliveries in
   * @param {string} request.query.zipcode - The zipcode to search for deliveries in
   * @param {Object} response - The HTTP response object
   * @returns {Object} Returns a JSON object containing an array of delivery objects matching the search criteria
   * @memberof DeliveryController
   */
  async findByCityOrZipcode(request, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} searchDeliveries`);
    // Extracts the search criteria (city and/or zipcode) from the request query parameters
    const searchData = request.query.search;
    // Checks that at least one search criteria is provided
    if (!searchData) {
      //   return response.status(400).json({ error: 'Invalid research' });
      next();
    }
    // Searches for delivery records in the database using the dataMapper and the provided search criteria
    const deliveries = await this.constructor.dataMapper.findByCityOrZipcode(
      searchData
    );
    // Sends the matching delivery records as a JSON response
    return response.json(deliveries);
  }

  /**
   *
   * @async
   * @function acceptDelivery
   * @param {Object} request - The request object
   * @param {Object} response - The response object
   * @returns {Promise} - Promise object represents the response of the API call
   * @description Accepts a delivery by updating the delivery object with the ID of the user who accepted it
   */
  async acceptDelivery(request, response) {
    debug(`${this.constructor.name} acceptDelivery`);
    const deliveryId = request.params.id;
    const { user } = request;
    // Retrieves the delivery object from the dataMapper
    const delivery = await this.constructor.dataMapper.findByPk(deliveryId);
    // If delivery does not exist, return a 404 status and an error message
    if (!delivery) {
      return response.status(404).json({ message: "La course n'existe pas." });
    }
    // Checks if the connected user is a carrier
    if (!user.carrier) {
      return response
        .status(403)
        .json({ message: "Vous n'êtes pas autorisé à accepter cette course." });
    }
    // Updates the delivery object with the ID of the connected user as the carrier
    delivery.carrier_id = user.id;
    // Calls the dataMapper method to update the delivery object in the database
    await this.constructor.dataMapper.acceptDelivery(
      delivery.id,
      delivery.carrier_id
    );
    // Return a success message in a JSON format
    return response.json({ message: 'La course a été acceptée.' });
  }
}

module.exports = new DeliveryController();
