const express = require("express");
const router = express.Router();
const {
  createTask,
  getUserTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/task.controllers.js");
const authMiddleware = require("../middlewares/auth.middlewares.js");

router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getUserTasks);
router.get("/:id", getTaskById); // getTaskById can also be referred to as getOneTask
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;

