const express = require('express');
const router = express.Router();
const endpoits = require('../controller/comments');

// Get comment via idfood
/**
 * @swagger
 * /api/comments/{idfood}:
 *   get:
 *     summary: Get comments for a food item
 *     description: Retrieve all comments for a specific food item.
 *     tags:
 *       - Member
 *     parameters:
 *       - name: idfood
 *         in: path
 *         required: true
 *         description: ID of the food item to get comments for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved comments.
 *       401:
 *         description: Unauthorized access or invalid cookie.
 *       500:
 *         description: Error fetching comments.
 */
router.get("/comments/:idfood", endpoits.getComments);

// Post a comment
/**
 * @swagger
 * /api/comments/postComment:
 *   post:
 *     summary: Post a comment for a food item
 *     description: Add a comment for a specific food item.
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
 *                 description: ID of the food item to comment on.
 *               commentText:
 *                 type: string
 *                 description: The content of the comment.
 *             required:
 *               - idfood
 *               - commentText
 *     responses:
 *       201:
 *         description: Comment posted successfully.
 *       401:
 *         description: Unauthorized access or invalid cookie.
 *       500:
 *         description: Error posting comment.
 */
router.post('/comments/postComment', endpoits.postComment);

module.exports = router;
