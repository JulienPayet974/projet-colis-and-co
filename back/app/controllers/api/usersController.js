const jwt = require('jsonwebtoken');
const debug = require('debug')('colis:controllers');
const bcrypt = require('bcrypt');

const CoreController = require('./CoreController');
const usersDataMapper = require('../../models/usersDataMapper');

/** Class representing a user controller */
class UsersController extends CoreController {
  static dataMapper = usersDataMapper;

  /**
   * create a user controller
   *
   * @augments CoreController
   */
  constructor() {
    super();
    debug('userController created');
  }

  /**
   * Login action to authenticate the user with provided email and password
   * @async
   * @function loginAction
   * @param {Object} request - HTTP request object
   * @param {Object} response - HTTP response object
   * @returns {Object} - JSON object containing user information and token
   */
  async loginAction(request, response) {
    debug(`${this.constructor.name} loginAction`);

    const { email, password } = request.body;

    // We need to verify if the user's email and password exist in the database
    // We must call the userDatamapper to make the request and store it in a variable
    const result = await this.constructor.dataMapper.loginAction(
      email,
      password,
    );
    debug('result', result);

    // Generates a token with JWT
    const token = jwt.sign(result, process.env.SECRET, { expiresIn: '86400s' });
    // Sends back the user's JSON with token
    const user = {
      id: result.id,
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      token,
    };

    response.json({ user });
    response.status(401);
  }

  /**
   * Creates a new user with secure password storage
   * @async
   * @function createSecureUser
   * @param {Object} request - HTTP request object
   * @param {Object} response - HTTP response object
   * @returns {Object} - JSON object containing the created user
   */
  async createSecureUser(request, response) {
    debug(`${this.constructor.name} create`);
    const createObj = request.body;
    const existingUser = await this.constructor.dataMapper.findByEmail(
      createObj.email,
    );
    if (existingUser) {
      response.status(409).json({ message: 'Email déjà utilisé' });
      return;
    }
    const createdUser = await this.constructor.dataMapper.createSecureUser(
      createObj,
    );
    const user = {
      id: createdUser.id,
      email: createdUser.email,
      firstName: createdUser.first_name,
      lastName: createdUser.last_name,
    };

    const token = jwt.sign(user, process.env.SECRET, { expiresIn: '86400s' });

    user.token = token;

    response.status(201).json({ user });
  }

  /**
   * Retrieves the account information for the logged in user
   * @async
   * @function findAccountByUserId
   * @param {Object} request - HTTP request object
   * @param {Object} response - HTTP response object
   * @returns {Object} - JSON object containing account information
   */
  async findAccountByUserId(request, response) {
    debug(`${this.constructor.name} getAccount`);
    const userId = request.user.id;
    const account = await this.constructor.dataMapper.findAccountByUserId(
      userId,
    );
    response.json(account);
  }

  /**
   * Updates a user by their ID
   * @async
   * @function updateUserById
   * @param {Object} request - HTTP request object
   * @param {Object} response - HTTP response object
   * @returns {Object} - JSON object containing the updated user data
   */
  async updateUserById(request, response) {
    debug(`${this.constructor.name} updateUserById`);
    // Get user ID from authenticated user's request
    const userId = request.user.id;
    // Get updates from request body
    const updates = request.body;
    // If password is being updated, hash it using bcrypt
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updates.password, salt);
      updates.password = hashedPassword;
    }
    // Update user in database using dataMapper
    const updatedCarrier = await this.constructor.dataMapper.updateUserById(
      userId,
      updates,
    );

    return response.json(updatedCarrier);
  }

  /**
   * Deletes the user account if password matches and user is authenticated
   * @async
   * @function deleteUserById
   * @param {Object} request - HTTP request object
   * @param {Object} response - HTTP response object
   * @returns {Object} - Returns a status code 204 if successful, otherwise status code 401 with an error message.
   */
  async deleteUserById(request, response) {
    debug(`${this.constructor.name} delete`);
    const { id } = request.user;
    const { password } = request.body;
    // Verifies user's password
    const user = await this.constructor.dataMapper.findByPk(id);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(401).json({ error: 'Mot de passe incorrect' });
    }
    // Deletes user's account
    await this.constructor.dataMapper.deleteUserById(id);
    return response.status(204).send();
  }

  /**
   * Finds a carrier by user's ID
   * @async
   * @function findCarrierByUserId
   * @param {Object} request - The HTTP request object
   * @param {Object} response - The HTTP response object
   * @returns {Object} - The carrier information as JSON, or a 404 error if the carrier is not found
   */
  async findCarrierByUserId(request, response) {
    debug(`${this.constructor.name} findCarrierByUserId`);
    const userId = request.params.id;
    const carrierInfo = await this.constructor.dataMapper.findCarrierByUserId(
      userId,
    );
    if (carrierInfo) {
      response.json(carrierInfo);
    } else {
      response.status(404).send('Transporteur non trouvé');
    }
  }

  /**
   * Update a carrier by its ID
   * @async
   * @function
   * @param {Object} request - The HTTP request object
   * @param {Object} response - The HTTP response object
   * @returns {Object}
   */
  async updateCarrierById(request, response) {
    debug(`${this.constructor.name} updateCarrierById`);
    // Gets the carrier ID and updates from the request body
    const carrierId = request.params.id;
    // Updates the carrier and get the updated carrier information
    const updated = request.body;
    const updatedCarrier = await this.constructor.dataMapper.updateCarrierById(
      carrierId,
      updated,
    );
    // If the carrier is not found, returns a 404 error response
    if (!updatedCarrier) {
      return response.status(404).send('Transporteur non trouvé');
    }
    // Returns the updated carrier information
    return response.json(updatedCarrier);
  }
}

module.exports = new UsersController();
