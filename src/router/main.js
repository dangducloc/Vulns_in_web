const express = require('express');
const router = express.Router();
const endpoits = require('../controller/main');

// Define API routes

// Get all cakes
/**
 * @swagger
 * /api/getCakes:
 *   get:
 *     summary: Get all cakes
 *     description: Retrieve a list of all available cakes from the database.
 *     tags:
 *       - Member
 *     responses:
 *       200:
 *         description: A list of cakes.
 *       500:
 *         description: Error fetching cakes from the server.
 */
router.get('/getCakes', endpoits.getCakes);

// Get cake by ID
/**
 * @swagger
 * /api/cake/{id}:
 *   get:
 *     summary: Get a cake by ID
 *     description: Retrieve a specific cake by its ID from the database.
 *     tags:
 *       - Member
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the cake to retrieve.
 *     responses:
 *       200:
 *         description: The requested cake object.
 *       404:
 *         description: Cake not found.
 *       500:
 *         description: Error fetching the cake.
 */
router.get('/cake/:id', endpoits.getCake);

// Sign-up route
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User sign-up
 *     description: Register a new user with name, password, email, and phone number.
 *     tags:
 *       - Member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               pass:
 *                 type: string
 *               mail:
 *                 type: string
 *               tel:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       500:
 *         description: Error during sign-up.
 */
router.post('/auth/signup', endpoits.signUp);

// Login route
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with a username and password.
 *     tags:
 *       - Member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               pass:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful. User data and a cookie are returned.
 *       401:
 *         description: Invalid username or password.
 *       500:
 *         description: Error during login.
 */
router.post('/auth/login', endpoits.login);

module.exports = router;
