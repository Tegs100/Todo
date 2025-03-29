const express = require("express");
const router = express.Router();
const { healthCheck }= require("../controllers/healthCheck.controllers");


router.get("/health", healthCheck);

module.exports = router;