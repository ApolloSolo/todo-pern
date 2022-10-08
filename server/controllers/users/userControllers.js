const db = require("../../connection/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/generateJWT");


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await db.query("DELETE FROM users WHERE id = $1", [id]);
    if (deletedUser.rowCount < 1) {
      throw new Error("Could not find user");
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  loginUser,
  registerUser,
  deleteUser,
};
