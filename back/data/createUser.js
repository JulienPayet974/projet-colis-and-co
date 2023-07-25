// Créer des  fausses données grace a Faker-Js pour l'user
const { faker } = require('@faker-js/faker');
const fs = require('fs').promises;

// Ici on dit a faker de générer des données en Français
faker.locale = 'fr';

// On va créer une variable avec 100 fausses "profils" users
const NB_USERS = 10;
const FILENAME = `users-${NB_USERS}.json`;
// Création des users pour notre fichier json, donc pour ça
// On va dévoir créer une function asynchrone pour créer les users
async function createFile() {
  await fs.writeFile(FILENAME, '[');
  // On a opté pour utiliser une boucle for, pour créer 100 faux profils
  // A chaque tour de boucle l'user va avoir un firstName,lastName,email,address,zipcode, etc
  // Tout ca séparé par des virgules,  fs.appendFile(FILENAME, ',');
  for (let userIndex = 0; userIndex < NB_USERS; userIndex += 1) {
    if (userIndex > 0) {
      await fs.appendFile(FILENAME, ',');
    }

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const password = faker.internet.password();
    const address = faker.address.streetAddress(true);
    const zipCode = faker.address.zipCodeByState();
    const city = faker.address.city();
    const phoneNumber = faker.phone.number();
    const carrier = faker.datatype.boolean();
    const identityVerified = faker.datatype.boolean();

    const user = {
      email,
      password,
      firstName,
      lastName,
      address,
      zipCode,
      city,
      phoneNumber,
      carrier,
      identityVerified,

    };
    await fs.appendFile(FILENAME, JSON.stringify(user));
    // A la fin de la boucle  on utilise la méthode JSON.stringify
    // convertir un objet JavaScript en une chaîne de caractères JSON.(string)
    // Comme ça chaque données que va etre inserer sur le FILENAME sera en string
    // Puis avec le fs.apprenFile(FILENAME,']'); on ferme le tableau dans le fichier JSON
  }
  await fs.appendFile(FILENAME, ']');
  console.log(`${FILENAME}file created`);
}
createFile();
