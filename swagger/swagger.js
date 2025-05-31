const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Author API',
      version: '1.0.0',
      description: 'API documentation for the Book Author API with OAuth',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'], // <-- this is the key line
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
