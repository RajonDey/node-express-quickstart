## 🔐 Authentication - MongoDB Setup
[Branch for Source Code 📂](https://github.com/RajonDey/node-express-quickstart/tree/5.1-Authentication-mongodb-setup)

In this section, we will set up MongoDB to handle user authentication. This includes creating a user model and updating our controllers to register users securely.

<br> 

### Step 1: Create User Model
To define the structure of user data in your database.

📂 models/userModel.js
```jsx
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user name"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
```
<br>
<br>

### Step 2: Update User Controller
To handle registration logic including hashing passwords before storing them in the database.

📂 controllers/userController.js
```jsx
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
```
_We used BCRYPT here for hashing passwords because storing raw passwords is insecure._

<br>
<br>

By setting up MongoDB for authentication and using BCRYPT to hash passwords, you ensure that sensitive information like passwords are stored securely. This approach not only enhances security but also prepares your application for real-world use cases where data protection is crucial.

Think of it as adding multiple locks on a door; each lock adds an extra layer of security, making it harder for unauthorized people to gain access!

<br>
<br>

[NEXT ➡ Authentication: JWT](https://github.com/RajonDey/node-express-quickstart/blob/main/STEPS/step-7.2.md)
