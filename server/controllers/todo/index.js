const {
  getOutstandingTodos,
  getAllTodos,
  getCompleteTodos,
} = require("./getUserTodos");
const getOneTodo = require("./getOneTodo");
const createTodo = require("./createTodo");
const { editTodo, changeTodoStatus } = require("./updateTodo");
const deleteTodo = require("./deleteTodo");

module.exports = {
  getOutstandingTodos,
  getAllTodos,
  getCompleteTodos,
  changeTodoStatus,
  getOneTodo,
  createTodo,
  editTodo,
  deleteTodo,
};
