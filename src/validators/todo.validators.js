import { body, query, param } from "express-validator";

const createTodoValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Todo title is required"),
    body("description").optional().trim(),
  ];
};

const getAllTodosQueryValidators = () => {
  return [
    query("query").optional(),
    query("complete")
      .optional()
      .isBoolean({ loose: true })
      .withMessage("complete flag must be a boolean."),
  ];
};

const getByIdValidator = (idName) => {
  return [
    param(idName).notEmpty().isMongoId().withMessage(`Invalid ${idName}`),
  ];
};

export { createTodoValidator, getAllTodosQueryValidators, getByIdValidator };
