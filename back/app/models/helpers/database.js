/**
 * Database connection module
 * @module database
*/

const debug = require('debug')('colis:database');
// Importe la classe Client du module 'pg'
const { Client } = require('pg');

// Crée une nouvelle instance de la classe 'Client'
const client = new Client(process.env.PG_URL);

// Connection à la base de donnée et affichage d'un message
client.connect().then(() => {
  debug('database client connected');
});

/**
 * @typedef {Object} DatabaseClient
 * @property {Client} originalClient - Le client Postgres original
 * @property {Function} query - Fonction de requête pour exécuter des commandes SQL
*/
module.exports = {
  /**
   * Le client Postgres original
   * @type {Client}
*/
  originalClient: client,

  /**
   * Fonction de requête pour exécuter des commandes SQL
   * @param {...*} params - Liste des paramètres à passer à la méthode query
   * @returns {Promise} - Promesse qui se résoudra avec les résultats de la requête
*/
  async query(...params) {
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/rest_parameters
    debug(...params); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    return this.originalClient.query(...params);
  },
};
