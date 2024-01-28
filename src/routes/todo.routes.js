import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  toggleTodoDoneStatus,
  updateTodo,
} from "../controllers/todo.controllers.js";
import {
  createTodoValidator,
  getAllTodosQueryValidators,
  getByIdValidator,
} from "../validators/todo.validators.js";
import { validate } from "../validators/validate.js";

const router = Router();
router.route("/createTodo").post(createTodoValidator(), validate, createTodo);
router
  .route("/getAllTodos")
  .get(getAllTodosQueryValidators(), validate, getAllTodos);
router
  .route("/todo/:todoId")
  .get(getByIdValidator("todoId"), validate, getTodoById)
  .patch(getByIdValidator("todoId"), validate, updateTodo)
  .delete(getByIdValidator("todoId"), validate, deleteTodo);
router
  .route("/toggle/status/:todoId")
  .patch(getByIdValidator("todoId"), validate, toggleTodoDoneStatus);

export default router;
