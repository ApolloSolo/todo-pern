const db = require("../../connection/db");

const editTodo = async (req, res) => {
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

const changeTodoStatus = async (req, res) => {
  try {
    const { todo_id } = req.params;
    const { username } = req.user;
    const { completed } = req.body;
    const updatedTodo = await db.query(
      "UPDATE todos SET completed = ($1), days_ahead = sub.days_left FROM (SELECT days_left FROM todos WHERE id = ($2) AND username = ($3)) AS sub WHERE id = ($2) AND username = ($3) RETURNING task, start_date, due_date, completed, days_ahead",
      [completed, todo_id, username]
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

//UPDATE todos SET completed = ($1) WHERE id = ($2) AND username = ($3) RETURNING task, start_date, due_date, completed

module.exports = { editTodo, changeTodoStatus };
