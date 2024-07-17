## 🔐 Authentication - JWT
[Branch for Source Code 📂](https://github.com/RajonDey/node-express-quickstart/tree/5.2-JWT-Authentication)

In this section, we will set up JSON Web Tokens (JWT) to handle user authentication securely. This includes generating tokens upon login and validating them for protected routes.

<br>

### Step 1: Install JSON Web Token Package
To generate and verify JWTs in your application.
```jsx
npm install jsonwebtoken
```
<br>
<br>

### Step 2: Update User Controller for Login
To generate a JWT when a user logs in successfully.

📂 controllers/userController.js
```jsx
const jwt = require("jsonwebtoken");

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mendatory!");
  }

  const user = await User.findOne({ email });

  // compare password with hashpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "5m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid!");
  }
});
```
<br>
<br>

### Create Middleware to Validate Token
To protect certain routes by ensuring that only authenticated users can access them.

📂 middleware/validateTokenHandler.js
```jsx
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = validateToken;
```

<br>
<br>

By integrating JWT into your authentication flow, you add an extra layer of security, making sure that only authorized users can access specific parts of your application. This approach ensures that sensitive data remains protected, and unauthorized access is prevented.

Think of it as issuing digital keys to trusted individuals; only those with the correct key can unlock and enter secure areas!

<br>
<br>

[NEXT ➡ Understanding Schema Relationships](https://github.com/RajonDey/node-express-quickstart/blob/main/STEPS/step-8.md)
