// Import the express module
const express = require("express");
const dotenv = require("dotenv").config();
const contactsRouter = require("./routes/contacts");
const connectDb = require("./config/dbConnection");
const { errorHandler } = require("./middleware/errorHandler");

// Connect DB
connectDb();

// Create an instance of an Express application
const app = express();

// Define the port number where the server will listen for requests
const port = process.env.PORT || 3000;

// Built-in Middleware to parse JSON requests
app.use(express.json());

// Use the routers with /api prefix for better organization
app.use("/api/contacts", contactsRouter);

// Define a route for the root URL ("/") that sends "Hello World!" as a response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handler middleware should be the last middleware to catch errors
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
