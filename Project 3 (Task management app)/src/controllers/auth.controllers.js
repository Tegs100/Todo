const userModel = require("../models/user.model"); 
const asyncHandler = require("../utils/asyncHandler.utils"); 
const ApiError = require("../utils/ApiError.utils"); 
const ApiResponse = require("../utils/ApiResponse.utils"); 
const jwt = require("jsonwebtoken"); 

// Generate the Access and Refresh Token
const generateAccessAndRefreshToken = async (userId) => {
    try { 
        const user = await userModel.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found.");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Unable to generate access and refresh tokens");
    }
};

// Register a user
const registerUser = asyncHandler(async (req, res) => {
    const { password, username, email, ...others } = req.body;

    // Check if user exists
    const existedUser = await userModel.findOne({
        $or: [{ username }, { email }],
    });
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // Create new user
    const newUser = await userModel.create({
        ...others,
        password,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
    });

    const createdUser = await userModel.findById(newUser._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Error creating user");
    }

    return res.status(201).json(new ApiResponse(201, "User created successfully", createdUser));
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;
    if (!identifier) {
        throw new ApiError(400, "Username or email is required");
    }

    const existedUser = await userModel.findOne({
        $or: [{ username: identifier }, { email: identifier }],
    });
    if (!existedUser) {
        throw new ApiError(400, "User does not exist");
    }

    const isPasswordValid = await existedUser.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(existedUser._id);
    const loggedInUser = await userModel.findById(existedUser._id).select("-password -refreshToken");

    const options = { httpOnly: true, secure: process.env.NODE_ENV === "production" };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
    await userModel.findByIdAndUpdate(req.user._id, { refreshToken: undefined }, { new: true });

    const options = { httpOnly: true, secure: process.env.NODE_ENV === "production" };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await userModel.findById(decodedToken?._id);
        if (!user || user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);
        const options = { httpOnly: true, secure: process.env.NODE_ENV === "production" };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while refreshing access token");
    }
});

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
};
