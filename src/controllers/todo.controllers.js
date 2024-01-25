import { Todo } from "../models/todo.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTodo = asyncHandler(async (req, res, error) => {
  const { title, description } = req.body;
  const todo = await Todo.create({
    title,
    description,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, todo, "Todo created successfully"));
});
export { createTodo };
