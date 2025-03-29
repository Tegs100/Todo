const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError.utils");
const asyncHandler = require("../utils/asyncHandler.utils");

const auth = asyncHandler(async (req, res, next) => {
    // Get token from cookies or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized - No token provided");
    }

    // Verify token using callback function
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return next(new ApiError(401, "Invalid or expired token"));
        }
        req.user = payload.id; // Store user ID from payload
        next();
    });
});

module.exports = auth;

