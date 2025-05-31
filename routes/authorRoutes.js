const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const ensureAuthenticated = require('../middleware/auth'); // 🔐 Import the middleware

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: API for managing authors
 */

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: A list of authors
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single author
 */

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: number
 *     responses:
 *       201:
 *         description: Author created successfully
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Author updated successfully
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted successfully
 */

// ✅ Public routes
router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);

// 🔐 Protected routes
router.post('/', ensureAuthenticated, authorController.createAuthor);
router.put('/:id', ensureAuthenticated, authorController.updateAuthor);
router.delete('/:id', ensureAuthenticated, authorController.deleteAuthor);

module.exports = router;
