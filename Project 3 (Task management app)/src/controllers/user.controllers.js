const User = require("../models/user.model.js");
const Task = require("../models/task.models.js");
const asyncHandler = require("../utils/asyncHandler.utils");
const ApiResponse = require("../utils/ApiResponse.utils");
const ApiError = require("../utils/ApiError.utils");

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) throw new ApiError(404, "User not found");

  res.json(new ApiResponse(200, "User profile retrieved", user));
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  await user.save();
  res.json(new ApiResponse(200, "User profile updated", user));
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  await Task.deleteMany({ user: req.user._id });
  await user.deleteOne();

  res.json(new ApiResponse(200, "User deleted successfully"));
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
