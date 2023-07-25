// Import necessary modules and dependencies
const express = require('express');
const { deliveryController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');
const validate = require('../../validations/validate');
const schemas = require('../../validations/schemas/delivery.schema');
const authenticationJwt = require('../../middlewares/authJwt');
const multer = require('../../middlewares/multer');

// Create an instance of an Express router
const router = express.Router();
/**
 * a delivery type
 *
 * @typedef {object} Delivery
 * @property {number} id - delivery id
 * @property {string} type_of_marchandise - delivery type_of_marchandise
 * @property {number} quantity - delivery quantity
 * @property {number} volume - delivery volume
 * @property {number} length - delivery length
 * @property {number} width - delivery width
 * @property {number} height - delivery height
 * @property {number} weight - delivery weight
 * @property {string} departure_address - delivery departure_address
 * @property {number} zipcode - delivery zipcode
 * @property {string} city - delivery city
 * @property {number} departure_phone_number - delivery departure_phone_number
 * @property {string} arrival_address - delivery arrival_address
 * @property {number} arrival_zipcode - delivery arrival_zipcode
 * @property {string} arrival_city - delivery arrival_city
 * @property {number} arrival_phone_number - delivery arrival_phone_number
 * @property {string} departure_date - delivery departure_date
 * @property {string} arrival_date - delivery arrival_date
 * @property {number} price - delivery price
 * @property {number} creator_id - delivery creator_id
 * @property {number} carrier_id - delivery carrier_id
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
 */

/**
 * Define a GET route for all deliveries
 * @route GET /deliveries
 * @group Deliveries - Operations about deliveries
 * @returns {object} 200 - An object with "result"
 * @returns {Error}  default - Unexpected error
 */
router.get(
  '/',
  controllerHandler(
    deliveryController.findAllDeliveries.bind(deliveryController),
  ),
);

/**
 * Define a GET route to search delivery by city or zipcode
 * @route GET /deliveries/search
 * @group Deliveries - Operations about deliveries
 * @returns {object} 200 - An object
 * @returns {Error}  500 - Unexpected error
 * @returns {Error}  400
 */
router.get(
  '/search',
  controllerHandler(
    deliveryController.findByCityOrZipcode.bind(deliveryController),
  ),
);

/**
 * Define a POST route to create a new delivery
 * @route POST /deliveries
 * @group Deliveries - Operations about deliveries
 * @param {string} type_of_marchandise.body - delivery type_of_marchandise
 * @param {number} quantity.body.required - delivery quantity
 * @param {number} volume.body.required - delivery volume
 * @param {number} length.body.required - delivery length
 * @param {number} width.body.required - delivery width
 * @param {number} height.body.required - delivery height
 * @param {number} weight.body.required - delivery weight
 * @param {string} departure_address.body.required - delivery departure_address
 * @param {number} zipcode.body.required - delivery zipcode
 * @param {string} city.body.required - delivery city
 * @param {number} departure_phone_number.required - delivery departure_phone_number
 * @param {string} arrival_address.body.required - delivery arrival_address
 * @param {number} arrival_zipcode.body.required - delivery arrival_zipcode
 * @param {string} arrival_city.body.required - delivery arrival_city
 * @param {number} arrival_phone_number.required - delivery arrival_phone_number
 * @param {string} departure_date.body.required - delivery departure_date
 * @param {string} arrival_date.body.required - delivery arrival_date
 * @param {number} price.body.required - delivery price
 * @returns {object} 200 - An object
 * @returns {Error}  500 - Internal server error
 */
router.post(
  '/',
  multer,
  validate(schemas.post, 'body'),
  controllerHandler(deliveryController.createDelivery.bind(deliveryController)),
);

/**
 * Define a GET route for one delivery
 * @route GET /deliveries/{id}
 * @group Deliveries - Operations about deliveries
 * @returns {object} 204 - An object with "result"
 */
router.get(
  '/:id',
  controllerHandler(deliveryController.findByPk.bind(deliveryController)),
);

/**
 * Define a PUT route to update one delivery
 * @route PUT /deliveries/{id}
 * @group Deliveries - Operations about deliveries
 * @returns {object} An object
 */
router.put(
  '/:id',
  validate(schemas.put, 'body'),
  controllerHandler(
    deliveryController.updateDeliveryById.bind(deliveryController),
  ),
);

/**
 * Define a PUT route to put a user as a carrier and confirm delivery
 * @route PUT /deliveries/{id}/accept
 * @group Deliveries - Operations about deliveries
 * @returns {object} - A message to confirm delivery
 */
router.put(
  '/:id/accept',
  validate(schemas.put, 'body'),
  controllerHandler(deliveryController.acceptDelivery.bind(deliveryController)),
);

/**
 * Define a DELETE route to suppress one delivery
 * @route DELETE /deliveries/{id}
 * @group Deliveries - Operations about deliveries
 * @returns {Response} 204
 */
router.delete(
  '/:id',
  authenticationJwt,
  controllerHandler(deliveryController.delete.bind(deliveryController)),
);

module.exports = router;
