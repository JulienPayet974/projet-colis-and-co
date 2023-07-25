// Importation des variables d'environnement
require('dotenv').config();

// Importation du module PostgreSQL
const { Client } = require('pg');

// Création d'une instance du client PostgreSQL
const client = new Client(process.env.PG_URL);
client.connect();

// Importation des données JSON pour les utilisateurs et les livraisons
const userData = require('./users-10.json');
const deliveryData = require('./delivery-10.json');

// Fonction qui importe les données dans une table spécifiée
async function importTable(tableName, data) {
  const promises = [];

  // Itération à travers chaque objet dans les données
  for (const obj of data) {
    const values = Object.values(obj);
    // Construction de la requête SQL INSERT INTO pour chaque objet
    const sqlQuery = `INSERT INTO ${tableName} VALUES ( DEFAULT,${values
      .map((_, i) => `$${i + 1}`)
      .join(', ')}) RETURNING *`;
    // Exécution de la requête SQL et stockage de la promesse résultante dans un tableau
    const promise = client.query(sqlQuery, values);
    promises.push(promise);
  }

  // Attente de l'exécution de toutes les promesses
  const results = await Promise.all(promises);
  console.log(`Eléments insérés dans ${tableName} : ${results.length}`);
}

// Fonction auto-exécutée qui importe les données dans les tables appropriées
(async () => {
  try {
    // Vidage des tables avant d'importer les données
    await client.query('TRUNCATE users,delivery CASCADE');
    // Importation des données dans les tables appropriées
    await Promise.all([
      importTable('users', userData),
      importTable('delivery', deliveryData),
    ]);
  } catch (error) {
    console.error(error.message);
  } finally {
    // Fermeture de la connexion au client PostgreSQL
    await client.end();
    // Fin du processus Node.js
    process.exit(0);
  }
})();
