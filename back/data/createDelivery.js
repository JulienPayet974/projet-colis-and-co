// Créer des  fausses données grace a Faker-Js pour les delivery
const { faker } = require('@faker-js/faker');
const fs = require('fs').promises;

// Ici on dit a faker de générer des données en Français
faker.locale = 'fr';

// On va créer une variable avec 100 fausses données au niveau des deliverys
const NB_DELIVERY = 10;
const FILENAME = `delivery-${NB_DELIVERY}.json`;
// Création des deliverys/adresses pour notre fichier json, donc pour ça
// On va dévoir créer une function asynchrone pour créer les deliverys
async function createFile() {
  await fs.writeFile(FILENAME, '[');
  // On a opté pour utiliser une boucle for, pour créer 100 faux addresses
  // A chaque tour de boucle le delivery  va créer  des données sur le colis a livrer,address,etc
  // Tout ca séparé par des virgules,  fs.appendFile(FILENAME, ',');
  for (let deliveryIndex = 0; deliveryIndex < NB_DELIVERY; deliveryIndex += 1) {
    if (deliveryIndex > 0) {
      await fs.appendFile(FILENAME, ',');
    }
    const type_of_marchandise = faker.commerce.product();
    const quantity = faker.datatype.number({ min: 1, max: 10 });
    const volume = faker.datatype.number({ min: 1, max: 20 });
    const length = faker.datatype.number({ min: 1, max: 100 });
    const width = faker.datatype.number({ min: 1, max: 100 });
    const height = faker.datatype.number({ min: 1, max: 100 });
    const weight = faker.datatype.number({ min: 1, max: 100 });
    const departure_address = faker.address.streetAddress(true);
    const zipCode = faker.address.zipCodeByState();
    const city = faker.address.city();
    const departure_phone_number = faker.phone.number();
    const arrival_address = faker.address.streetAddress(true);
    const arrival_zipcode = faker.address.zipCodeByState();
    const arrival_city = faker.address.city();
    const arrival_phone_number = faker.phone.number();
    const price = faker.commerce.price();
    const delivery = {
      type_of_marchandise, quantity, volume, length, width, height, weight, departure_address, zipCode, city, departure_phone_number, arrival_address, arrival_zipcode, arrival_city, arrival_phone_number, price,
    };
    await fs.appendFile(FILENAME, JSON.stringify(delivery));
    // A la fin de la boucle  on utilise la méthode JSON.stringify
    // convertir un objet JavaScript en une chaîne de caractères JSON.(string)
    // Comme ça chaque données que va etre inserer sur le FILENAME sera en string
    // Puis avec le fs.apprenFile(FILENAME,']'); on ferme le tableau dans le fichier JSON
  }
  await fs.appendFile(FILENAME, ']');
  console.log(`${FILENAME}file created`);
}
createFile();
