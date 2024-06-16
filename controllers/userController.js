const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mendatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("This user is already registered");
  }

  // Hash password
  const hasdedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hasdedPassword);

  const user = await User.create({
    username, 
    email, 
    password: hasdedPassword
  });
  console.log(`User created ${user}`);

  if(user){
    res.status(201).json({_id: user.id, email: user.email})
  }else{
    res.status(400);
    throw new Error("User Data is not valid!");
  }

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
