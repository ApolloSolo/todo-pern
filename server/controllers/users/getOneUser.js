const db = require("../../connection/db");

const getOneUser = async (req, res) => {
  try {
    const { username } = req.params;
    const oneUser = await db.query(
      "SELECT users.id, users.username, users.email FROM users WHERE username = $1",
      [username]
    );
    if (oneUser.rowCount < 1) {
      throw new Error("User could not be found");
    }

    res.json(oneUser.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = getOneUser;
