const db = require("../../connection/db");

const deleteUser = async (req, res) => {
  const {username} = req.body
  try {
    const deletedUser = await db.query("DELETE FROM users WHERE username = $1", [username]);
    if (deletedUser.rowCount < 1) {
      throw new Error("Could not find user");
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = deleteUser;
