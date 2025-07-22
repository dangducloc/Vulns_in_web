const express = require('express');
const router = express.Router();
const endpoits = require('../controller/cart');

// get cart
/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get cart items for a user
 *     description: Retrieve all items in the cart for the logged-in user.
 *     tags:
 *       - Member
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items.
 *       401:
 *         description: Unauthorized access or invalid cookie.
 *       500:
 *         description: Error fetching cart data.
 */
router.get("/cart", endpoits.getCart);

// add item to cart
/**
 * @swagger
 * /api/cart/addItem:
 *   post:
 *     summary: Add an item to the cart
 *     description: Add an item to the user's cart.
 *     tags:
 *       - Member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idfood:
 *                 type: integer
 *                 description: ID of the food item to add.
 *     responses:
 *       201:
 *         description: Item added to cart successfully.
 *       401:
 *         description: Unauthorized access or invalid cookie.
 *       500:
 *         description: Error adding item to the cart.
 */
router.post('/cart/addItem', endpoits.addItem);

// update item in cart
/**
 * @swagger
 * /api/cart/updateItem:
 *   put:
 *     summary: Update an item in the cart
 *     description: Update the quantity of an item in the user's cart.
 *     tags:
 *       - Member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idfood:
 *                 type: integer
 *                 description: ID of the food item to update.
 *               quantity:
 *                 type: integer
 *                 description: New quantity of the food item.
 *     responses:
 *       201:
 *         description: Item updated in the cart successfully.
 *       401:
 *         description: Unauthorized access or invalid cookie.
 *       500:
 *         description: Error updating item in the cart.
 */
router.put('/cart/updateItem', endpoits.updateItem);

// remove item from cart
/**
 * @swagger
 * /api/cart/deleteItem:
 *   delete:
 *     summary: Delete an item from the cart
 *     description: Remove an item from the user's cart.
 *     tags:
 *       - Member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idfood:
 *                 type: integer
 *                 description: ID of the food item to delete.
 *     responses:
 *       201:
 *         description: Item removed from cart successfully.
 *       401:
 *         description: Unauthorized access or invalid cookie.
 *       500:
 *         description: Error removing item from the cart.
 */
router.delete('/cart/deleteItem', endpoits.deleteItem);

module.exports = router;
