// db_comments.mjs
import sql from './db.mjs'; // Assuming db.mjs exports a connection to your PostgreSQL database

class DbComments {
  constructor() {}

  // Function to add a new comment
  async addComment(userId, commentText) {
    try {
      const result = await sql`
        INSERT INTO comments (id, comment_text)
        VALUES (${userId}, ${commentText})
        RETURNING *; // Returns the new comment
      `;
      return result[0]; // Assuming you want to return the inserted comment
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // Function to retrieve all comments
  async getAllComments() {
    try {
      const result = await sql`
        SELECT * FROM comments;
      `;
      return result;
    } catch (error) {
      console.error('Error retrieving comments:', error);
      throw error;
    }
  }

  // Function to retrieve comments by user ID
  async getCommentsByUserId(userId) {
    try {
      const result = await sql`
        SELECT * FROM comments WHERE id = ${userId};
      `;
      return result;
    } catch (error) {
      console.error('Error retrieving comments for user:', error);
      throw error;
    }
  }

  // Function to update a comment
  async updateComment(commentId, userId, newCommentText) {
    try {
      const result = await sql`
        UPDATE comments
        SET comment_text = ${newCommentText}
        WHERE commentid = ${commentId} AND id = ${userId}
        RETURNING *; // Returns the updated comment
      `;
      return result[0]; // Assuming you want to return the updated comment
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  // Function to delete a comment
  async deleteComment(commentId, userId) {
    try {
      const result = await sql`
        DELETE FROM comments
        WHERE commentid = ${commentId} AND id = ${userId}
        RETURNING *; // Returns the deleted comment
      `;
      return result[0]; // Assuming you want to return the deleted comment
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
}

const dbComments = new DbComments();
export default dbComments