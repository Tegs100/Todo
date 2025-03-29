const ApiResponse = require("../utils/ApiResponse.utils");
const asyncHandler = require("../utils/asyncHandler.utils");
const mongoose = require("mongoose");

const healthCheck = asyncHandler(async (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

    return res.status(200).json(new ApiResponse(200, "OK", {
        message: "Health check passed",
        database: dbStatus,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    }));
});

module.exports = { healthCheck };
