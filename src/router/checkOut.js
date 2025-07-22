const express = require('express');
const router = express.Router();
const endpoits = require('../controller/checkOut');

// Checkout
/**
 * @swagger
 * /api/checkOut:
 *   post:
 *     summary: Checkout a user's cart
 *     description: Complete the checkout process for the user's cart. Requires login.
 *     tags:
 *       - Member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment:
 *                 type: string
 *                 enum: [Credit Card, Debit Card, Cash]
 *                 description: The payment method.
 *               address:
 *                 type: string
 *                 description: The shipping address.
 *             required:
 *               - payment
 *               - address
 *     responses:
 *       200:
 *         description: Successfully checked out.
 *       401:
 *         description: Unauthorized. The user must be logged in to checkout.
 *       500:
 *         description: Error during the checkout process.
 */
router.post("/checkOut", endpoits.checkOut);

module.exports = router;
