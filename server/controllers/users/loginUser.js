const db = require("../../connection/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/generateJWT");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please fill out all fields");
    }
    const user = await db.query(
      "SELECT users.id, users.username, users.email, users.passhash FROM users WHERE users.email=$1",
      [email]
    );
    if (user.rowCount > 0) {
      const validUser = await bcrypt.compare(password, user.rows[0].passhash);
      if (validUser) {
        res.status(201).json({
          token: generateToken({
            id: user.rows[0].id,
            username: user.rows[0].username,
            email: user.rows[0].email,
          }),
        });
      } else {
        res.status(401).json({ message: "Not authorized user credentials" });
      }
    } else {
      res.status(401).json({ message: "Not authorized user credentials" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = loginUser;
