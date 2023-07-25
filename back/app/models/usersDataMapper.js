const debug = require('debug')('colis:dataMapper');
const bcrypt = require('bcrypt');
const CoreDataMapper = require('./CoreDataMapper');
const client = require('./helpers/database');

const saltRounds = 10;

/** Class representing a users data mapper. */
class UserDataMapper extends CoreDataMapper {
  static tableName = 'users';

  /**
   * create a users data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('users data mapper created');
  }

  /**
   * Finds a user in the database by their email address
   * @async
   * @function getUserByEmail
   * @param {string} email - The email address of the user to find
   * @returns {Promise<object>} - A Promise that resolves with an object representing the user with the given email
*/
  async getUserByEmail(email) {
    debug(`${this.constructor.name} loginAction(${email}`);

    // On construit la requête
    const preparedQuery = {
      text: `
        SELECT id, email, password, first_name, last_name
        FROM "${this.constructor.tableName}"
        WHERE email = $1 
        ORDER BY "id"
      `,
      values: [email],
    };

    // On stocke le résultat dans une variable
    const result = await client.query(preparedQuery);

    // On stocke le résultat sous forme d'un tableau
    return result.rows[0];
  }

  /**
   * Logs a user in by their email and password
   * @async
   * @function loginAction
   * @param {string} email - The email address of the user to log in
   * @param {string} password - The password of the user to log in
   * @returns {Promise<object>} - A Promise that resolves with an object representing the logged-in user's information, including their ID, email address, first name, and last name.
   * @throws {Error} - If the email or password is invalid
*/
  async loginAction(email, password) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Invalid email or password');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    };
  }

  /**
   * Finds a user by their email
   * @async
   * @function findByEmail
   * @param {string} email - Email of the user to be found
   * @returns {object} - Returns the user
*/
  async findByEmail(email) {
    debug(`${this.constructor.name} findByEmail`);
    const preparedQuery = {
      text: `SELECT * FROM ${this.constructor.tableName} WHERE email = $1`,
      values: [email],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  /**
   * Creates a new user with a hashed password
   * @async
   * @function createSecureUser
   * @param {object} newUser - Object containing user details to be created
   * @param {string} newUser.email - Email of the user to be created
   * @param {string} newUser.password - Password of the user to be created
   * @param {string} newUser.firstName - First name of the user to be created
   * @param {string} newUser.lastName - Last name of the user to be created
   * @returns {object} - Returns the created user object with the hashed password
*/
  async createSecureUser(newUser) {
    debug(`${this.constructor.name} CreateSecureUser`);
    // Hasher le mot de passe avant de l'ajouter à la base de données
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

    // Ajouter l'utilisateur à la base de données avec le mot de passe sécurisé
    const columns = Object.keys(newUser).filter((key) => key !== 'password').join(', ');
    const values = Object.values(newUser).filter((val) => val !== newUser.password).map((val) => `'${val}'`).join(', ');
    const preparedQuery = {
      text: `INSERT INTO ${this.constructor.tableName} (${columns}, password) VALUES (${values}, $1) RETURNING *`,
      values: [hashedPassword],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  /**
   * Finds an specific account by their user's ID
   * @async
   * @function findAccountByUserId
   * @param {number} userId - ID of the user whose account is to be found
   * @returns {object|null} - Returns the account object if found, otherwise returns null
*/
  async findAccountByUserId(userId) {
    debug(`${this.constructor.name} findAccountByUserId`);
    const query = {
      text: `SELECT * FROM ${this.constructor.tableName} WHERE id = $1`,
      values: [userId],
    };
    const result = await client.query(query);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  /**
   * Allows a user to update their account information
   * @async
   * @function updateUserById
   * @param {number} userId - ID of the user to be updated
   * @param {object} updates - Object containing fields to be updated
   * @param {string} [updates.email] - Email of the user to be updated
   * @param {string} [updates.password] - Password of the user to be updated
   * @param {string} [updates.firstName] - First name of the user to be updated
   * @param {string} [updates.lastName] - Last name of the user to be updated
   * @returns {object} - Returns the updated user object
*/
  async updateUserById(userId, updates) {
    debug(`${this.constructor.name} updateCarrierByUserId(${userId}, ${JSON.stringify(updates)})`);
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updates.password, salt);
      updates.password = hashedPassword;
    }

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
   * Deletes a specific user's account found by their ID
   * @async
   * @function deleteUserById
   * @param {number} id - ID of the user to be deleted
*/
  async deleteUserById(id) {
    debug(`${this.constructor.name} delete(${id})`);
    const preparedQuery = {
      text: `DELETE FROM "${this.constructor.tableName}" WHERE id=$1`,
      values: [id],
    };
    await client.query(preparedQuery);
  }

  /**
   * Finds a specific user who is a carrier
   * @async
   * @function findCarrierByUserId
   * @param {number} userId - ID of the carrier to be found
   * @returns {object} - Returns the carrier object
   * */
  async findCarrierByUserId(userId) {
    debug(`${this.constructor.name} findCarrierByUserId(${userId})`);
    const preparedQuery = {
      text: `SELECT * FROM "${this.constructor.tableName}"  WHERE id = $1 AND carrier = true`,
      values: [userId],
    };
    const { rows } = await client.query(preparedQuery);
    return rows[0];
  }

  /**
   * Updates a carrier's account information
   * @async
   * @function updateCarrierById
   * @param {number} carrierId - ID of the carrier to be updated
   * @param {object} updated - Object containing fields to be updated
   * @param {string} [updated.email] - Email of the carrier to be updated
   * @param {string} [updated.password] - Password of the carrier to be updated
   * @param {string} [updated.firstName] - First name of the carrier to be updated
   * @param {string} [updated.lastName] - Last name of the carrier to be updated
   * @returns {object} - Returns the updated carrier object
*/
  async updateCarrierById(carrierId, updated) {
    debug(`${this.constructor.name} updateCarrierByUserId(${carrierId}, ${JSON.stringify(updated)})`);
    const setClause = Object.keys(updated)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(', ');
    const whereClause = '"id"=$1 AND "carrier"=true';
    const preparedQuery = {
      text: `UPDATE "${this.constructor.tableName}" SET ${setClause} WHERE ${whereClause} RETURNING *`,
      values: [carrierId, ...Object.values(updated)],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  }
}

module.exports = new UserDataMapper();
