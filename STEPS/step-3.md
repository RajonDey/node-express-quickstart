## 🗺️ Express Router Setup
[Branch for Source Code 📂
](https://github.com/RajonDey/node-express-quickstart/tree/1-Express-Router-Setup)

Organizing your routes is crucial for maintaining a clean and scalable codebase in an Express application. Using the `express.Router` class, you can modularize your route definitions, making them easier to manage and maintain.
<br>

### Why Use Express Router?
*   📦 **Modularity**: Break down your routes into separate files based on functionality.
*   🔧 **Maintainability**: Easier to read and update specific parts of your routing logic.
*   🚀 **Scalability**: Simplifies adding new features without cluttering a single file.

<br> 
<br> 

### Steps to Set Up Express Router:

1.  **📁 Create Route Files:**:
    *   Create a directory named `routes` in your project root.
    *   Inside the routes directory, create individual route files (e.g., contacts.js, users.js, products.js).
  
2.  **Define Routes in Separate Files**:<br>
    _In each route file, use the `express.Router()` method to define endpoints._
    ```jsx
    // routes/contacts.js
    const express = require("express");
    const router = express.Router();
    
    router.get("/", (req, res) => {
       //res.send("Get all Contacts..."); - Simple text
      res.status(200).json({ Message: "Get all contacts" }); // - Formatted JSON-formatted data
    });
    
    router.post("/", (req, res) => {
      res.status(200).json({ Message: "Create contacts" }); 
    });
    
    router.get("/:id", (req, res) => {
      res.status(200).json({ Message: `Get contact for ${req.params.id}` }); 
    });
    
    router.put("/:id", (req, res) => {
      res.status(200).json({ Message: `Update contact for ${req.params.id}` }); 
    });
    
    router.delete("/:id", (req, res) => {
      res.status(200).json({ Message: `Delete contact for ${req.params.id}` }); 
    });
    
    module.exports = router;
    ```


4.  **Integrate Routes with Main Application**:<br>
    _Import and use these route modules in your main server file (app.js or server.js)._
    ```jsx
    // server.js
    const usersRouter = require("./routes/contacts");
    
    // Use the routers
    app.use('/users', usersRouter);
    ```

<br>  
<br>  

### In case you don't get it:

Think of using Express Router like organizing different sections of a library into separate shelves; each shelf contains books related to one topic only. This makes it easy for anyone to find what they are looking for without getting lost among unrelated topics.

By setting up routers this way, you ensure that each part of your application is neatly organized and easily accessible!

[NEXT ➡ Implementing Controllers](https://github.com/RajonDey/node-express-quickstart/blob/main/STEPS/step-4.md)
