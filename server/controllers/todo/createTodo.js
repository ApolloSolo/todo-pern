const db = require("../../connection/db");
const { daysLeft } = require("../../utils/time_date");

const createTodo = async (req, res) => {
    try {
      const { username } = req.user;
      const { task, start_date, due_date } = req.body;
      const timeLeft = daysLeft(due_date, start_date);
  
      const newTodo = await db.query(
        "INSERT INTO todos(username, task, start_date, due_date, days_left) VALUES ($1, $2, $3, $4, $5) RETURNING username, task, start_date, due_date, days_left",
        [username, task, start_date, due_date, timeLeft]
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

  module.exports = createTodo;