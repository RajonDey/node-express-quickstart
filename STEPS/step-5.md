## 🔄 Handling HTTP Methods and Middleware

### Built-in Middleware for POST Request Body
Express provides built-in middleware functions that help parse incoming request bodies before your handlers receive them. This is particularly useful when dealing with POST requests where data is sent in the body of the request.

1.  Enable JSON Parsing:
    To parse JSON payloads, use express.json() middleware.// app.js or server.jsconst express = require('express');const app = express();// Enable parsing of JSON bodiesapp.use(express.json());// Other middlewares and route setups...
    ```jsx
    // app.js or server.js
    const express = require('express');
    const app = express();
    
    // Enable parsing of JSON bodies
    app.use(express.json());
    
    // Other middlewares and route setups...
    ```    

    *Express Throw Error*
    Throwing errors within your routes/controllers helps you manage unexpected situations gracefully. Here's how you can do it:
    
    *Example*
    ```jsx
    // controllers/contactController.js
    const createContact = (req, res) => {
      if (!req.body.name || !req.body.email) {
        res.status(400);
        throw new Error("Name and Email are required");
      }
    
      res.status(201).json({ message: "Create contact" });
    };
    ```    
    In this example, if the name or email fields are missing from the request body, an error is thrown with a status code of 400 (Bad Request).


### Error Handling Middleware
To catch all unhandled errors in one place, add a global error-handling middleware at the end of your middleware stack.

### Step-by-Step Guide:
1.  **Define Global Error Handler:**
    ```jsx
    // middleware/errorHandler.js
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
    ```

    Create the constant:
    ```jsx
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
    ```

2.  **Use Global Error Handler in Your App:**
    
    Add this handler after all other middlewares and route definitions.
    ```jsx
    //app .js or server .js
    const{errorHandler}=require('./middlewares/errorHandler');
    
    //Other middlewaresandroutesetups...
    
    //GlobalErrorHandlingMiddleware
    app.use(errorHandler);
    
    
    //Start the server...
    ```

3.  **Test Your Setup:**
    now we will through our error, by our controller and test.
    so for this we will install, ‘express-async-handler’, so by using this we don’t have to write all this try catch block to catch the errors.
    ```jsx
    const expressAsyncHandler = require("express-async-handler");
    const ERROR_RESPONSES = require("../constant/ERROR_RESPONSES");
    
    // @desc    Get all contacts
    // @route   GET /api/contacts
    // @access  Public
    const getContacts = expressAsyncHandler(async(req, res) => {
      res.status(200).json({ message: "Get all contacts" });
    });
    
    // @desc    Get a single contact
    // @route   GET /api/contacts/:id
    // @access  Public
    const getContact = expressAsyncHandler(async(req, res) => {
      res.status(200).json({ message: `Get contact for ${req.params.id}` });
    });
    
    // @desc    Create new contact
    // @route   POST /api/contacts
    // @access  Public
    const createContact = expressAsyncHandler(async(req, res) => {
      console.log("The request body is:", req.body);
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        res.status(400).json(ERROR_RESPONSES[400]);
        return;
      }
      res.status(201).json({ message: "Create contact" });
    });
    
    // @desc    Update contact
    // @route   PUT /api/contacts/:id
    // @access  Public
    const updateContact = expressAsyncHandler(async(req, res) => {
      res.status(200).json({ message: `Update contact for ${req.params.id}` });
    });
    
    // @desc    Delete contact
    // @route   DELETE /api/contacts/:id
    // @access  Public
    const deleteContact = expressAsyncHandler(async(req, res) => {
      res.status(200).json({ message: `Delete contact for ${req.params.id}` });
    });
    
    module.exports = {
      getContacts,
      getContact,
      createContact,
      updateContact,
      deleteContact,
    };
    ```
    
