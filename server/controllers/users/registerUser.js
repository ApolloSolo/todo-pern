const db = require("../../connection/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/generateJWT");

const registerUser = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;
    console.log(email, username, password, confirmPassword);
    if (password != confirmPassword) {
      throw new Error("Your passwords do not match.");
    }

    if (!email || !username || !password || !confirmPassword) {
      throw new Error("Please enter all fields");
    }

    const foundUser = await db.query(
      "SELECT email FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );
    if (foundUser.rowCount === 0) {
      // register
      const hashedPass = await bcrypt.hash(password, 12);
      const newUser = await db.query(
        "INSERT INTO users(username, email, passhash) VALUES ($1, $2, $3) RETURNING username, email, id",
        [username, email, hashedPass]
      );
      console.log(newUser.rows[0]);
      res.status(201).json({
        token: generateToken(newUser.rows[0]),
      });
    } else {
      res.json({ loggedIn: false, status: "Email or Username already in use" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

module.exports = registerUser;
