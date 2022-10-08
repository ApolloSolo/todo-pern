const db = require("../../connection/db");

const updateTodo = async (req, res) => {
    try {
      const { todo_id } = req.params;
      const { username } = req.user;
      const { task, start_date, due_date } = req.body;
      const updatedTodo = await db.query(
        "UPDATE todos SET task = ($3), start_date = ($4), due_date = ($5) WHERE id = ($1) AND username = ($2) RETURNING task, start_date, due_date",
        [todo_id, username, task, start_date, due_date]
      );
      if (updatedTodo.rows.length > 0) {
        res.json({ message: "To-do updated", updatedTodo: updatedTodo.rows[0] });
      } else {
        throw new Error("Todo could not be updated");
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  };

  module.exports = updateTodo;