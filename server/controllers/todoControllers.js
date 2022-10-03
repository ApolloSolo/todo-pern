const db = require("../connection/db");
const { daysLeft } = require("../utils/time_date");

const getUserTodos = async (req, res) => {
  try {
    const { username } = req.user;
    const allTodos = await db.query(
      "SELECT * FROM todos WHERE username = ($1) ORDER BY due_date ASC",
      [username]
    );
    if (allTodos.rows.length > 0) {
      res.json(allTodos.rows);
    } else {
      throw new Error("No todo's found");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getOneTodo = async (req, res) => {
  try {
    const { todo_id } = req.params;
    const { username } = req.user;
    const oneTodo = await db.query(
      "SELECT * FROM todos WHERE username = ($1) AND id = ($2)",
      [username, todo_id]
    );
    if (oneTodo.rows.length > 0) {
      let timeLeft = daysLeft(
        oneTodo.rows[0].due_date,
        oneTodo.rows[0].start_date
      );
      oneTodo.rows[0].daysLeft = timeLeft;
      res.json(oneTodo.rows[0]);
    } else {
      throw new Error("No todo");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { username } = req.user;
    const { task, start_date, due_date } = req.body;
    const newTodo = await db.query(
      "INSERT INTO todos(username, task, start_date, due_date) VALUES ($1, $2, $3, $4) RETURNING username, task, start_date, due_date",
      [username, task, start_date, due_date]
    );
    if (newTodo.rows.length > 0) {
      res.json(newTodo.rows);
    } else {
      throw new Error("Todo could not be created");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

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
1;
module.exports = {
  getUserTodos,
  getOneTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
