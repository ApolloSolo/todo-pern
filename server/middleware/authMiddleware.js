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

      console.log("Decoded VAR: " + decoded)

      const foundUser = await db.query(
        "SELECT users.id, users.username, users.email FROM users WHERE users.username = $1",
        [decoded.data.username]
      );

      if(foundUser.rows.length === 0) {
        throw new Error("User could not be varified")
      }

      req.user = foundUser.rows[0]

      next();
    } catch (error) {
      console.log(error);
      res.json({error: error.message})
      //throw new Error("Not authorized");
    }
  }
};

module.exports = protected;
//