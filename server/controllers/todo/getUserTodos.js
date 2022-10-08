const db = require("../../connection/db");

const getOutstandingTodos = async (req, res) => {
  try {
    const { username } = req.user;

    const allTodos = await db.query(
      "SELECT todos.task, todos.due_date, todos.start_date, todos.days_left  FROM todos WHERE username = ($1) AND completed = false ORDER BY due_date ASC",
      [username]
    );
    const due_today = await db.query("SELECT get_due_today(($1))", [username]);
    const due_week = await db.query("SELECT get_due_week(($1))", [username]);
    const due_in_30 = await db.query("SELECT get_due_30(($1))", [username]);
    const due_beyond_30 = await db.query("SELECT get_due_beyond_30(($1))", [
      username,
    ]);

    if (
      allTodos.rows.length > 0 &&
      due_today.rows.length > 0 &&
      due_week.rows.length > 0 &&
      due_in_30.rows.length > 0 &&
      due_beyond_30.rows.length > 0
    ) {
      const aggregate = {
        total: allTodos.rows.length,
        due_today: due_today.rows[0].get_due_today,
        due_week: due_week.rows[0].get_due_week,
        due_in_30: due_in_30.rows[0].get_due_30,
        due_beyond_30: due_beyond_30.rows[0].get_due_beyond_30,
      };
      const data = {
        aggregate,
        todos: allTodos.rows,
      };
      res.json(data);
    } else {
      throw new Error("No todo's found");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const { username } = req.user;

    const allTodos = await db.query(
      "SELECT * FROM todos WHERE username = ($1) ORDER BY due_date ASC",
      [username]
    );
    const due_today = await db.query("SELECT get_due_today(($1))", [username]);
    const due_week = await db.query("SELECT get_due_week(($1))", [username]);
    const due_in_30 = await db.query("SELECT get_due_30(($1))", [username]);
    const due_beyond_30 = await db.query("SELECT get_due_beyond_30(($1))", [
      username,
    ]);

    if (
      allTodos.rows.length > 0 &&
      due_today.rows.length > 0 &&
      due_week.rows.length > 0 &&
      due_in_30.rows.length > 0 &&
      due_beyond_30.rows.length > 0
    ) {
      const aggregate = {
        total: allTodos.rows.length,
        due_today: due_today.rows[0].get_due_today,
        due_week: due_week.rows[0].get_due_week,
        due_in_30: due_in_30.rows[0].get_due_30,
        due_beyond_30: due_beyond_30.rows[0].get_due_beyond_30,
      };
      const data = {
        aggregate,
        todos: allTodos.rows,
      };
      res.json(data);
    } else {
      throw new Error("No todo's found");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getCompleteTodos = async (req, res) => {
  try {
    const { username } = req.user;

    const completedTodos = await db.query(
      "SELECT todos.task, todos.due_date, todos.start_date, todos.completed, todos.days_ahead FROM todos WHERE username = ($1) AND completed = true ORDER BY due_date ASC",
      [username]
    );

    if (completedTodos.rows.length > 0) {
      const data = {
        total: completedTodos.rows.length,
        todos: completedTodos.rows,
      };
      res.json(data);
    } else {
      throw new Error("No todo's found");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { getOutstandingTodos, getAllTodos, getCompleteTodos };
