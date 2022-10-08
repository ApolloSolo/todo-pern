const db = require("../../connection/db");

const getOneTodo = async (req, res) => {
  try {
    const { todo_id } = req.params;
    const { username } = req.user;
    const oneTodo = await db.query(
      "SELECT * FROM todos WHERE username = ($1) AND id = ($2)",
      [username, todo_id]
    );
    if (oneTodo.rows.length > 0) {
      res.json(oneTodo.rows[0]);
    } else {
      throw new Error("No todo");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = getOneTodo;
