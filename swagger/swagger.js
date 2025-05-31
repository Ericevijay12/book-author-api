const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book and Author Management API',
      version: '1.0.0',
      description: 'A simple CRUD API for managing books and authors',
    },
    servers: [
      {
        url: 'https://book-author-api.onrender.com', // Production
      },
      {
        url: 'http://localhost:5000', // Local dev
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
