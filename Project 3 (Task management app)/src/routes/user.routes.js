const express = require("express");
const { getUserProfile, updateUserProfile, deleteUser } = require("../controllers/user.controllers.js");
const authMiddleware = require("../middlewares/auth.middlewares.js");

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.delete("/profile", deleteUser);

module.exports = router;
