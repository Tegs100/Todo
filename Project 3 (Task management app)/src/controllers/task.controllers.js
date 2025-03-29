const Task = require("../models/task.models.js");
const asyncHandler = require("../utils/asyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");
const ApiResponse = require("../utils/ApiResponse.utils");

// Create a new task
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, category, dueDate } = req.body;
  
  const task = await Task.create({
    title,
    description,
    status,
    category,
    dueDate,
    user: req.user._id, // Associate task with logged-in user
  });

  res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});

// Get all tasks for a user
const getUserTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });

  res.status(200).json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
});

// Get a single task
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) throw new ApiError(404, "Task not found");

  res.status(200).json(new ApiResponse(200, task, "Task retrieved successfully"));
});

// Update a task
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id }, // Ensure the task belongs to the user
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) throw new ApiError(404, "Task not found");

  res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
});

// Delete a task
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!task) throw new ApiError(404, "Task not found");

  res.status(200).json(new ApiResponse(200, null, "Task deleted successfully"));
});

module.exports = {
  createTask,
  getUserTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
