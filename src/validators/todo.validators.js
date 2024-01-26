import { body, query } from "express-validator";
const createTodoValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Todo title is required"),
    body("description").optional().trim(),
  ];
};

export { createTodoValidator };
