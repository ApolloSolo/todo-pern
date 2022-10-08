const router = require("express").Router();
const {
  getAllUsers,
  getOneUser,
  loginUser,
  registerUser,
  deleteUser,
} = require("../../controllers/users");
const protected = require("../../middleware/authMiddleware");

router.get("/", protected, getAllUsers);
router.get("/:username", protected, getOneUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.delete("/remove", protected, deleteUser);

module.exports = router;

