const jwt = require("jsonwebtoken");
const db = require("../connection/db");
require("dotenv").config();

const protected = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const foundUser = await db.query(
        "SELECT users.id, users.username, users.email FROM users WHERE users.username = $1",
        [decoded.data.username]
      );

      req.user = foundUser.rows[0]

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
};

module.exports = protected;