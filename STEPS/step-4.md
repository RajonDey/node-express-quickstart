## 🏗️ Setting Up Controllers
[Branch for Source Code 📂](https://github.com/RajonDey/node-express-quickstart/tree/2-Setting-Up-Controllers)

<br>

### Create Contact Controller for Contacts CRUD Operations

In this section, we will create a controller to handle all CRUD (Create, Read, Update, Delete) operations for our contacts. This involves defining functions that correspond to each of these operations and then linking them to our routes.

It will contain all our logic for request and response.

<br>
<br>

### Step-by-Step Guide:

#### 1.  Create the Directory:
- First, create a new directory named controllers in your project root if it doesn't already exist.
    
#### 2.  Create the Controller File:
- Inside the controllers directory, create a file named `contactController.js`.    

#### 4.  Define Controller Functions:
_Open `contactController.js` and define the following functions:_

```jsx
// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};

// @desc    Get a single contact
// @route   GET /api/contacts/:id
// @access  Public
const getContact = (req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
};

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Public
const createContact = (req, res) => {
  res.status(201).json({ message: "Create contact" });
};

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Public
const updateContact = (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Public
const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
```

#### 5.  Linking Controller Functions to Routes:<br>
_Open your routes file where you have defined your endpoints for contacts (routes/contactRoutes.js) and modify it as follows:_

```jsx
const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
```

#### 6.  **Test Your Endpoints:
- Now that you've set up both the controller and linked it with routes, you can test these endpoints using tools like Postman or Thunder Client.
    
<br>
<br>

### **In case, If you don’t get it yet:**

Imagine you are managing a library, and your job is to handle all the books in the library. You need a system that allows you to add new books, view all available books, update book information, and remove old or damaged books from the collection. In this analogy:
*   **Library** = Your Express application
*   **Books** = Contacts
*   **Librarian** = The controller (contactController.js)
*   **Library Desk** = Routes (where requests come in)

<br>
<br>

[NEXT ➡ Implementing Controllers](https://github.com/RajonDey/node-express-quickstart/blob/main/STEPS/step-4.md)
