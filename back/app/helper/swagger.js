const expressSwagger = require('express-swagger-generator');
const path = require('path');
require('dotenv').config();
/**
 * Sets up Swagger documentation for an Express.js application
 * @function setupSwagger
 * @param {*} app
 */
function setupSwagger(app) {
  // Object that specifies the basic information about the API
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        description: 'Livraison de colis entre particuliers',
        title: 'Colis&co Swagger',
        version: '1.0.0',
      },
      // host: `localhost:${process.env.PORT}`,
      host: 'colis-and-co.up.railway.app',
      basePath: '/api',
      produces: [
        'application/json',
      ],
      schemes: ['https'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'JWT',
        },
      },
    },
    // Specifies the path to the root directory of the application
    basedir: path.join(__dirname, '..'),
    // Specifies the path to the folder containing the API handle files
    files: ['./routers/api/*.js'],
  };

  expressSwagger(app)(swaggerOptions);
}

module.exports = setupSwagger;
