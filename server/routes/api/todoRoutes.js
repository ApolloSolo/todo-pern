const router = require("express").Router();
const {
  getOutstandingTodos,
  getAllTodos,
  getCompleteTodos,
  changeTodoStatus,
  getOneTodo,
  createTodo,
  editTodo,
  deleteTodo,
} = require("../../controllers/todo");
const protected = require("../../middleware/authMiddleware");

router.get("/", protected, getAllTodos);
router.get("/incomplete", protected, getOutstandingTodos);
router.get("/complete", protected, getCompleteTodos);
router.get("/:todo_id", protected, getOneTodo);
router.post("/new", protected, createTodo);
router.put("/edit/:todo_id", protected, editTodo);
router.put("/status/:todo_id", protected, changeTodoStatus);
router.delete("/remove/:todo_id", protected, deleteTodo);

module.exports = router;
