const fs = require('fs');
const path = require('path');
const deliveries = require('./delivery-10.json');
const users = require('./users-10.json');

let transaction = 'BEGIN;';

async function generateSQL() {
  deliveries.forEach((delivery) => {
    transaction += `
      INSERT INTO "delivery"(
      "type_of_marchandise", 
      "quantity",
      "volume",
      "length",
      "width",
      "height",
      "weight",
      "departure_address",
      "zipcode",
      "city",
      "departure_phone_number",
      "arrival_address",
      "arrival_zipcode",
      "arrival_city",
      "arrival_phone_number",
      "departure_date",
      "arrival_date",
      "price"
      
      )
      VALUES(
        '${delivery.type_of_marchandise}', 
        '${delivery.quantity}',
        '${delivery.volume}',
        '${delivery.length}',
        '${delivery.width}',
        '${delivery.height}',
        '${delivery.weight}',
        '${delivery.departure_address}',
        '${delivery.zipCode}',
        '${delivery.city}',
        '${delivery.departure_phone_number}',
        '${delivery.arrival_address}',
        '${delivery.arrival_zipcode}',
        '${delivery.arrival_city}',
        '${delivery.arrival_phone_number}',
        '${delivery.departure_date}',
        '${delivery.arrival_date}',
        '${delivery.price}'
        );
    `;
  });
  users.forEach((user) => {
    transaction += `
      INSERT INTO "users"(
        "email",
        "password", 
        "first_name", 
        "last_name", 
        "address",
        "comp_address",
        "zipcode",
        "city",
        "birth_date",
        "phone_number",
        "carrier",
        "identity_verified"
        )
      VALUES
        (
          '${user.email}',
          '${user.password}',
          '${user.firstName}',
          '${user.lastName}',
          '${user.address}',
          '${user.compAdress}',
          '${user.zipCode}',
          '${user.city}',
          '${user.birthDate}',
          '${user.phoneNumber}',
          '${user.carrier}',
          '${user.identityVerified}'          
        );
      `;
  });
  transaction += 'COMMIT;';
  fs.writeFileSync(path.join(__dirname, 'seeding.sql'), transaction);
}

generateSQL();
/* eslint-disable-next-line */
console.log('fichier seeding.sql généré');