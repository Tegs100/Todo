const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError.utils");

const errorHandler = (err, req, res, next) => {
    // Log the error only in development mode
    if (process.env.NODE_ENV === "development") {
        console.error(err);
    }

    let error = err;
    if (!(error instanceof ApiError)) {
        if (err instanceof mongoose.Error.ValidationError) {
            error = new ApiError(400, "Validation Error", err.errors);
        } else if (err instanceof mongoose.Error.CastError) {
            error = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
        } else {
            const statusCode = err.statusCode || 500;
            const message = err.message || "Something went wrong";
            error = new ApiError(statusCode, message, err?.errors || [], err.stack);
        }
    }

    // Build the response object
    const response = {
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors || [],
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    };

    return res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
