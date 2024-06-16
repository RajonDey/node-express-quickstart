// errorResponses.js

const ERROR_RESPONSES = {
  400: {
    title: "Validation Failed",
    message:
      "The request could not be understood or was missing required parameters.",
  },
  401: {
    title: "Unauthorized",
    message:
      "Authentication failed or user does not have permissions for the desired action.",
  },
  403: {
    title: "Forbidden",
    message:
      "Authentication succeeded but authenticated user does not have access to the resource.",
  },
  404: {
    title: "Not Found",
    message: "The requested resource could not be found.",
  },
  500: {
    title: "Internal Server Error",
    message: "An error occurred on the server.",
  },
};

module.exports = ERROR_RESPONSES;
