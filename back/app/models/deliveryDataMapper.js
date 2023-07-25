const debug = require('debug')('colis:dataMapper');
const CoreDataMapper = require('./CoreDataMapper');
const client = require('./helpers/database');

class DeliveryDataMapper extends CoreDataMapper {
  // Define the table name for this data mapper
  static tableName = 'delivery';

  constructor() {
    super();
    debug('delivery data mapper created');
  }

  /** Retrieves a specified page of delivery records from the corresponding database table
   * @async
   * @function findAllDeliveries
   * @param {number} page - The page number to retrieve
   * @param {number} limit - The maximum number of records to retrieve per page
   * @returns {Promise<Array<Object>>} - A promise that resolves with an array of delivery records
   */
  async findAllDeliveries(page, limit) {
    debug(`${this.constructor.name} findAllDeliveries ${page} ${limit}`);
    const pageSize = (page - 1) * limit;
    const preparedQuery = {
      text: ` SELECT * FROM "${this.constructor.tableName}" ORDER BY id LIMIT $1 OFFSET $2`,
      values: [limit, pageSize],
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  /**
   * Creates a new delivery with the given delivery object and image URL
   * @async
   * @function createDelivery
   * @param {Object} delivery - The delivery object to be created
   * @param {string} imageUrl - The URL of the image associated with the delivery
   * @returns {Object} - The newly created delivery object along with the user who created it
   */
  // Create a new delivery in the database
  async createDelivery(delivery, imageUrl) {
    const keys = Object.keys(delivery).filter((key) => key !== 'creator_id');
    const columns = keys.join(', ');
    const values = keys.map((key) => `'${delivery[key]}'`).join(', ');
    const preparedQuery = {
      text: `INSERT INTO ${this.constructor.tableName} (${columns}, image, creator_id) VALUES (${values}, '${imageUrl}', $1) RETURNING *`,
      values: [delivery.creator_id],
    };
    const { rows } = await client.query(preparedQuery);

    const deliveryId = rows[0].id;
    const query = {
      text: `SELECT delivery.*, users.id AS user_id
             FROM ${this.constructor.tableName} 
             JOIN users ON delivery.creator_id = users.id
             WHERE delivery.id = $1`,
      values: [deliveryId],
    };
    const {
      rows: [deliveryWithUser],
    } = await client.query(query);

    return deliveryWithUser;
  }

  /**
   * Updates a delivery by its ID with the provided updates
   * @async
   * @function updateDeliveryById
   * @param {number} userId - The ID of the delivery to update
   * @param {object} updates - The updates to apply to the delivery
   * @returns {Promise<object>} The updated delivery object
   */
  async updateDeliveryById(userId, updates) {
    debug(
      `${
        this.constructor.name
      } updateCarrierByUserId(${userId}, ${JSON.stringify(updates)})`
    );
    const setClause = Object.keys(updates)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(', ');
    const preparedQuery = {
      text: `UPDATE "${this.constructor.tableName}" SET ${setClause}  WHERE id =$1  RETURNING *`,
      values: [userId, ...Object.values(updates)],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  }

  /**
   * Finds deliveries by city or zipcode
   * @async
   * @function findByCityOrZipcode
   * @param {string} city - The city name to search for deliveries
   * @param {string} zipcode - The zipcode or department code to search for deliveries
   * @throws {Error} If neither city nor zipcode is provided
   * @returns {Array} An array of deliveries matching the search criteria
   */
  async findByCityOrZipcode(searchData) {
    debug(`${this.constructor.name} findByCityOrZipcode(${searchData})`);

    const preparedQuery = {
      text: `SELECT * FROM "${this.constructor.tableName}" WHERE city ILIKE '%' || $1 || '%' OR zipcode LIKE $1 || '%' OR arrival_city ILIKE '%' || $1 || '%'`,
      values: [searchData],
    };

    const result = await client.query(preparedQuery);
    return result.rows;
  }

  /**
   * Accepts a delivery by updating the carrier_id field of a delivery with the specified deliveryId
   * if the delivery exists and has no carrier assigned to it yet
   * @async
   * @function acceptDelivery
   * @param {number} deliveryId - The ID of the delivery to accept
   * @param {number} carrierId - The ID of the carrier accepting the delivery
   * @throws {Error} If the delivery does not exist or already has a carrier assigned to it
   * @returns {Object} The updated delivery object
   */
  async acceptDelivery(deliveryId, carrierId) {
    debug(
      `${this.constructor.name} acceptDelivery(${deliveryId}, ${carrierId})`
    );
    const preparedQuery = {
      text: `UPDATE "${this.constructor.tableName}"  SET carrier_id = $1 WHERE id = $2 AND carrier_id IS NULL RETURNING *`,
      values: [carrierId, deliveryId],
    };
    const result = await client.query(preparedQuery);

    if (result.rowCount === 0) {
      throw new Error("La course n'existe pas.");
    }
    return result.rows[0];
  }
}

module.exports = new DeliveryDataMapper();
