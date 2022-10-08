const db = require("../../connection/db");

const getAllUsers = async (req, res) => {
  try {
    if (req.user) {
      const allUsers = await db.query(
        "SELECT users.id, users.username, users.email FROM users"
      );
      res.json(allUsers.rows);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = getAllUsers;
