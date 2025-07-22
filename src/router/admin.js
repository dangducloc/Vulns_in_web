const express = require('express');
const router = express.Router();
const endpoints = require('../admin/admin.controller');

// Delete a user
/**
 * @swagger
 * /api/admin/deleteUser:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     description: Delete a user by ID (Only accessible to admin users).
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: integer
 *                 description: ID of the user to delete.
 *             required:
 *               - idUser
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       403:
 *         description: Forbidden, access denied.
 *       500:
 *         description: Error deleting user.
 */
router.delete('/admin/deleteUser', endpoints.deleteUser);

// Change the price of a food item
/**
 * @swagger
 * /api/admin/changePrice:
 *   put:
 *     summary: Change the price of a food item (Admin only)
 *     description: Update the price of a food item by ID (Only accessible to admin users).
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idFood:
 *                 type: integer
 *                 description: ID of the food item.
 *               newPrice:
 *                 type: integer
 *                 description: New price for the food item.
 *             required:
 *               - idFood
 *               - newPrice
 *     responses:
 *       200:
 *         description: Price updated successfully.
 *       404:
 *         description: Food item not found.
 *       403:
 *         description: Forbidden, access denied.
 *       500:
 *         description: Error updating price.
 */
router.put('/admin/changePrice', endpoints.changePrice);

// Update food item details
/**
 * @swagger
 * /api/admin/updateDetailInfo:
 *   put:
 *     summary: Update food item details (Admin only)
 *     description: Update the details of a food item by ID (Only accessible to admin users).
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idFood:
 *                 type: integer
 *                 description: ID of the food item.
 *               newInfo:
 *                 type: string
 *                 description: New details for the food item.
 *             required:
 *               - idFood
 *               - newInfo
 *     responses:
 *       200:
 *         description: Food item details updated successfully.
 *       404:
 *         description: Food item not found.
 *       403:
 *         description: Forbidden, access denied.
 *       500:
 *         description: Error updating food details.
 */
router.put('/admin/updateDetailInfo', endpoints.updateDetailInfo);
//detele a comment
/**
 * @swagger
 * /api/admin/deleteComment:
 *   delete:
 *     summary: Delete a comment (Admin only)
 *     description: Delete a comment by ID (Only accessible to admin users).
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idBL:
 *                 type: integer
 *                 description: ID of the comment to delete.
 *             required:
 *               - idBL
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *       401:
 *         description: Unauthorized access or invalid role.
 *       500:
 *         description: Error deleting comment.
 */
router.delete('/admin/deleteComment', endpoints.deleteComment);


//get all users
/**
 * @swagger
 * /api/admin/getUsers:
 *   get:
 *     summary: Retrieve all users
 *     description: Only admin users can retrieve all users.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                     example: John Doe
 *                   mail:
 *                     type: string
 *                     description: The user's mail.
 *                     example: John@gmail.com
 *                   role:
 *                     type: string
 *                     description: The user's role.
 *                     example: member
 *       401:
 *         description: Unauthorized, only admin users can access this.
 */
router.get('/admin/getUsers', endpoints.getUsers);

// Change the status of an order to 1 and update food amount
/**
 * @swagger
 * /api/admin/changeOrderStatus:
 *   put:
 *     summary: Change order status to 1 and update food amount (Admin only)
 *     description: Change the status of an order to 1 and reduce the amount of the corresponding food item. Only accessible to admin users.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idOrder:
 *                 type: integer
 *                 description: ID of the order to update.
 *             required:
 *               - idOrder
 *     responses:
 *       200:
 *         description: Status updated and food amount adjusted successfully.
 *       400:
 *         description: Bad request, IDOrder is required.
 *       404:
 *         description: Order not found or already processed.
 *       403:
 *         description: Forbidden, access denied.
 *       500:
 *         description: Error updating status or adjusting food amount.
 */
router.put('/admin/changeOrderStatus', endpoints.changeOrderStatus);

// Get all orders with user information
/**
 * @swagger
 * /api/admin/getAllOrders:
 *   get:
 *     summary: Get all orders with user information (Admin only)
 *     description: Retrieve a list of all orders along with user details. Only accessible to admin users.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDOrder:
 *                     type: integer
 *                     description: The order ID.
 *                     example: 1
 *                   IDUser:
 *                     type: integer
 *                     description: The user ID associated with the order.
 *                     example: 123
 *                   User_name:
 *                     type: string
 *                     description: The user's name.
 *                     example: John Doe
 *                   Address:
 *                     type: string
 *                     description: The address for the order.
 *                     example: "123 Main St"
 *                   Date:
 *                     type: string
 *                     description: The order date.
 *                     example: "2024-10-10"
 *                   Payment:
 *                     type: string
 *                     description: The payment method for the order.
 *                     example: "Credit Card"
 *       403:
 *         description: Forbidden, access denied.
 *       500:
 *         description: Error retrieving orders.
 */
router.get('/admin/getAllOrders', endpoints.getAllOrders);

/**
 * @swagger
 * /api/admin/getOrderDetails/{IDOrder}:
 *   get:
 *     summary: Get order details with food information by IDOrder (Admin only)
 *     description: Retrieve detailed information of a specific order, including food details, based on IDOrder. Only accessible to admin users.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: IDOrder
 *         required: true
 *         description: The ID of the order to retrieve details for.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Order details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDOrder:
 *                     type: integer
 *                     description: The order ID.
 *                     example: 1
 *                   IDFood:
 *                     type: integer
 *                     description: The food ID.
 *                     example: 101
 *                   Food:
 *                     type: string
 *                     description: The name of the food.
 *                     example: "Pizza"
 *                   Amount:
 *                     type: integer
 *                     description: The amount of food in the order.
 *                     example: 2
 *                   Price:
 *                     type: integer
 *                     description: The price of the food.
 *                     example: 15000
 *                   state:
 *                     type: integer
 *                     description: The state of the order.
 *                     example: 0
 *       403:
 *         description: Forbidden, access denied.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Error retrieving order details with food information.
 */
router.get('/admin/getOrderDetails/:IDOrder', endpoints.getOrderDetails_via_IDOrder);

module.exports = router;

module.exports = router;
