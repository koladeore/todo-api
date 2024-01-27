import { Router } from "express";
import {
  createTodo,
  getAllTodos,
  getTodoById,
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
  .get(getByIdValidator("todoId"), validate, getTodoById);

export default router;
