const router = require("express").Router();
const {
  getUserTodos,
  getOneTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../../controllers/todo");
const protected = require("../../middleware/authMiddleware");

router.get("/", protected, getUserTodos);
router.get("/:todo_id", protected, getOneTodo);
router.post("/new", protected, createTodo);
router.put("/update/:todo_id", protected, updateTodo);
router.delete("/remove/:todo_id", protected, deleteTodo);

module.exports = router;
