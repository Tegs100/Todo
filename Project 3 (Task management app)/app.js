const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


// Import routes
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const taskRoutes = require("./src/routes/task.routes");

const app = express();

// Middlwares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})); // The cors is used to allow the frontend to access the backend from a different port
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes); // ✅ Register task routes

module.exports = app;
