## 🔄 Handling HTTP Methods and Middleware
[Branch for Source Code 📂](https://github.com/RajonDey/node-express-quickstart/tree/3-HTTP-Methods-and-Middleware)

### Built-in Middleware for POST Request Body
Express provides built-in middleware functions that help parse incoming request bodies before your handlers receive them. This is particularly useful when dealing with POST requests where data is sent in the body of the request.

#### Enable JSON Parsing:<br>
_To parse JSON payloads, use `express.json()` middleware._    
```jsx
// app.js or server.js
const express = require('express');
const app = express();

// Enable parsing of JSON bodies
app.use(express.json());

// Other middlewares and route setups...
```    

#### Express Throw Error:<br>
_Throwing errors within your routes/controllers helps you manage unexpected situations gracefully. Here's how you can do it:_

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

<br>
---
<br>

### Error Handling Middleware
To catch all unhandled errors in one place, add a global error-handling middleware at the end of your middleware stack.

#### Step-by-Step Guide:
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

    Create the constant file:
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

<br>
<br>

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
<br>
<br>

3.  **Test Your Setup:**
    Now we will through our error, by our controller and test.
    So for this we will install, ‘express-async-handler’, so by using this we don’t have to write all this try catch block to catch the errors.
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
    
<br>  
<br>  

### In case you don't get it:

Think of handling HTTP methods and using middleware like running a restaurant kitchen efficiently. The built-in middleware functions are like prep cooks who prepare ingredients before they reach chefs (your handlers), ensuring everything runs smoothly during service.

By setting up proper error handling,you ensure that any issues are caught early,and appropriate responses are sent back,much like having a head chef oversee quality control in every dish served.

This way,your application remains robust,reliable,and easyto maintain!

<br>  
<br>  

[NEXT ➡ Database Configuration](https://github.com/RajonDey/node-express-quickstart/blob/main/STEPS/step-6.md)
