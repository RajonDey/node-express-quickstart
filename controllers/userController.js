const expressAsyncHandler = require("express-async-handler");

// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
const registerUser = expressAsyncHandler(async (req, res) => {
  res.json({ message: "Register the user" });
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = expressAsyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});

// @desc    Current user info
// @route   POST /api/users/login
// @access  Private
const currentUser = expressAsyncHandler(async (req, res) => {
  res.json({ message: "Current user information" });
});


module.exports = { registerUser, loginUser, currentUser };