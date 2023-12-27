// comments.mjs
import express from 'express';
import dbComments from '../db/db_comments.mjs';

const router = express.Router();

// Middleware to check if the user is logged in
const isAuthenticated = (req, res, next) => {
  // This is just a placeholder. You'll need to implement the actual check
  // to see if the user is authenticated based on your application's auth system
  if (req.isAuthenticated) {
    return next();
  }
  res.status(403).json({ message: "You're not authorized to perform this action" });
};

// POST route to create a new comment
// POST route to create a new comment
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const userId = req.id; // Assuming the user ID is stored in req.id
    const { commentText } = req.body;
    const newComment = await dbComments.addComment(userId, commentText);
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// GET route to retrieve all comments
router.get('/', async (req, res) => {
  try {
    const comments = await dbComments.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// PUT route to update a comment
router.put('/:commentId', isAuthenticated, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, commentText } = req.body; // Ensure you have user's id from session or token
    const updatedComment = await dbComments.updateComment(commentId, userId, commentText);
    if (updatedComment) {
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ message: 'Comment not found or user not authorized to edit this comment.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// DELETE route to delete a comment
router.delete('/:commentId', isAuthenticated, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body; // Ensure you have user's id from session or token
    const deletedComment = await dbComments.deleteComment(commentId, userId);
    if (deletedComment) {
      res.status(200).json({ message: 'Comment deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Comment not found or user not authorized to delete this comment.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;