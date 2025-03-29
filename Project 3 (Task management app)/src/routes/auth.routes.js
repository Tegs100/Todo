const express = require("express");
const { registerUser, loginUser, refreshAccessToken, logoutUser } = require("../controllers/auth.controllers.js");
const authMiddleware = require("../middlewares/auth.middlewares.js");

const router = express.Router();

// Authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", authMiddleware, logoutUser);

module.exports = router;
