## Authentication - JWT

  npm install jsonwebtoken
  controller → userController.js
  
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

  middleware → validateTokenHandler.js
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
