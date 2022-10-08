const db = require("../../connection/db");

const deleteTodo = async (req, res) => {
    try {
      const { todo_id } = req.params;
      const { username } = req.user;
      const deletedTodo = await db.query(
        "DELETE FROM todos WHERE id = ($1) AND username = ($2)",
        [todo_id, username]
      );
      if (deletedTodo.rowCount > 0) {
        res.json(deletedTodo);
      } else throw new Error("Todo could not be deleted");
    } catch (error) {
      res.json({ error: error.message });
    }
  };

  module.exports = deleteTodo;