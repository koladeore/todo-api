import { Router } from "express";
import { createTodo } from "../controllers/todo.controllers.js";
import { createTodoValidator } from "../validators/todo.validators.js";
import { validate } from "../validators/validate.js";

const router = Router();
router.route("/createTodo").post(createTodoValidator(), validate, createTodo);

export default router;
