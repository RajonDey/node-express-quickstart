// errorHandler.js

const ERROR_RESPONSES = require("../constant/ERROR_RESPONSES");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging

  // If res.statusCode is not set, set it to 500 (Internal Server Error)
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Set the status code before sending the response
  res.status(statusCode);

  // Get the error response based on the status code, or default to the 500 response
  const errorResponse = ERROR_RESPONSES[statusCode] || ERROR_RESPONSES[500];

  // Send the response
  res.json({
    title: errorResponse.title,
    message: err.message,
    stackTrace: err.stack,
  });
};

module.exports = { errorHandler };
