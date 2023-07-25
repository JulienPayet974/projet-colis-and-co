const debug = require('debug')('colis:dataMapper');
const client = require('./helpers/database');

class CoreDataMapper {
  static tableName;

  static viewName; // if viewName is defined, it will be used for find methods

  /**
   * Fetches all rows from the corresponding database table or view
   * @async
   * @function findAll
   * @returns {Promise<Object[]>} - An array of objects representing the fetched rows
   * Each object corresponds to a row in the database, and contains key-value pairs representing the columns and their values
*/
  // Trouver tous les éléments dans la table ou la vue correspondant à la classe appelante
  async findAll() {
    debug(`${this.constructor.name} findAll`);
    const tableName = this.constructor.viewName || this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}" ORDER BY "id";`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  /**
   * Fetches a single row from the corresponding database table or view by its primary key
   * @async
   * @function findByPk
   * @param {number} id - The value of the primary key to search for
   * @returns {Promise<Object>} - An object representing the fetched row
*/
  // Trouver un élément dans la table ou la vue correspondant à la classe
  // appelante à partir de son ID
  async findByPk(id) {
    debug(`${this.constructor.name} findByPk(${id})`);
    const tableName = this.constructor.viewName || this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}" WHERE id=$1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  /**
   * Creates a new row in the corresponding database table with the specified column values
   * @async
   * @function
   * @param {Object} createObj - An object representing the column names and their values for the new rows
   * @returns {Promise<Object>} - An object representing the newly created row
  */
  // Crée un nouvel élément dans la table correspondant à la classe appelante
  async create(createObj) {
    debug(`${this.constructor.name} create`);
    const columns = Object.keys(createObj).join(', ');
    const values = Object.values(createObj).map((val) => `'${val}'`).join(', ');
    const preparedQuery = {
      text: `INSERT INTO ${this.constructor.tableName} (${columns}) VALUES (${values}) RETURNING *`,
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  /**
   * Updates a row in the corresponding database table with the specified column values
   * @async
   * @function update
   * @param {number} id - The value of the primary key to search for
   * @param {Object} modObject - An object representing the column names and their updated values for the row
   * @returns {Promise<Object>} - An object representing the updated row
   * */
  // Update un élément dans la table correspondant à la classe appelante à partir de son ID
  async update(id, modObject) {
    // Ajoute un message de debug pour suivre l'exécution de la fonction
    debug(`${this.constructor.name} modify(${id})`);
    // Fait une copie de l'objet de modification pour éviter de modifier l'original
    const modifiedItem = { ...modObject };
    // Crée une chaîne de caractères contenant chaque paire clé-valeur sous forme de colonne pour la requête SQL
    const columns = Object.keys(modifiedItem).map((key) => `${key} = '${modifiedItem[key]}'`).join(', ');
    // Prépare la requête SQL avec le nom de la table, les colonnes à modifier et l'ID de l'élément à modifier
    const preparedQuery = {
      text: `UPDATE ${this.constructor.tableName} SET ${columns} WHERE id = $1 RETURNING *`,
      values: [id],
    };
      // Exécute la requête SQL en utilisant le client de la base de données et récupère les résultats
    const results = await client.query(preparedQuery);
    // Renvoie le premier élément de la réponse (il ne devrait y en avoir qu'un puisque l'ID est unique)
    return results.rows[0];
  }

  /**
   * Deletes a row from the corresponding database table or view by its primary key
   * @async
   * @function delete
   * @param {number} id - The value of the primary key to search for
   * @returns {Promise<void>} - A promise that resolves when the delete operation is complete
   */
  async delete(id) {
    debug(`${this.constructor.name} delete(${id})`);
    const preparedQuery = {
      text: `DELETE FROM "${this.constructor.tableName}" WHERE id=$1`,
      values: [id],
    };
    await client.query(preparedQuery);
  }
}

module.exports = CoreDataMapper;
