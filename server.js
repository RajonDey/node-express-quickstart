// Import the express module
const express = require("express");
const dotenv = require("dotenv").config();
const usersRouter = require("./routes/contacts");

// Create an instance of an Express application
const app = express();

// Define the port number where the server will listen for requests
const port = process.env.PORT || 3000; 

// Use the routers with /api prefix for better organization
app.use('/api/users', usersRouter);

// Define a route for the root URL ("/") that sends "Hello World!" as a response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
