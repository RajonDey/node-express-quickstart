## Authentication - Adding User Routes and Controllers
[Branch for Source Code 📂](https://github.com/RajonDey/node-express-quickstart/tree/5.0-Authentication-Adding-User-Routes-and-Controllers)

In this section, we will set up authentication by adding user routes and controllers to handle registration, login, and fetching current user information.

<br>

### Step 1: Update Server File
Add the user routes - To include the new user routes in your application.

_📂 server.js_
```jsx
const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);
```
<br>
<br>

### Step 2: Define User Routes
Create a new route file for handling user-related endpoints for actions like registration and login.

_📂 routes/users.js_ 
```jsx
const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
    res.json({message: "Register the user"});
})

router.post("/login", (req, res) => {
  res.json({ message: "Login user" });
});

router.get("/current", (req, res) => {
  res.json({ message: "Current user information" });
});

module.exports = router;
```

<br>
<br>

### Step 3: Create User Controller
Define controller functions to handle the logic for each route for better code organization.

📂 controllers/userController.js
```jsx
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
```

<br>
<br>

By setting up these routes and controllers for authentication, you have laid down the foundation for handling essential operations like registering new users and logging them in. This modular approach ensures that your code is organized and maintainable as your application grows.

Think of it as creating different counters at a service center—each counter handles specific tasks efficiently without causing confusion or delays!

<br>
<br>

[NEXT ➡ Authentication: MongoDB Integration](https://github.com/RajonDey/node-express-quickstart/blob/main/STEPS/step-7.1.md)
