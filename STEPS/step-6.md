## Database setup:
[Branch for Source Code 📂](https://github.com/RajonDey/node-express-quickstart/tree/4-Database-Integration-with-MongoDB)

In this section, we will set up MongoDB to store our contact data. Follow these steps to integrate MongoDB with your Express application.

<br>
<br>

### Step 1: Create the Database and Collection
First, ensure you have a MongoDB database created along with a contacts collection.

<br>
<br>

### Step 2: Configure Database Connection
Create a configuration file to handle the connection to your MongoDB instance.

_📂 config/dbConnection.js_
```jsx
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database connected", connect.connection.host, connect.connection.name);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDb;
```
<br>
<br>

### Step 3: Connect to the Database in Your Server File
Update your server file to establish a connection with the database when the server starts.

_📂 server.js_
```jsx
const express = require('express');
const app = express();
const connectDb = require("./config/dbConnection");

// Connect DB
connectDb();

// Other middlewares and route setups...

// Start the server...
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
<br>
<br>

### Step 4: Create Mongoose Model
Define a schema for your contacts using Mongoose.

_📂 models/contactModel.js_
```jsx
const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the contact name"],
  },
  email: {
    type: String,
    required: [true, "Please add the contact email address"],
  },
  phone: {
    type: String,
    required: [true, "Please add the contact phone number"],
  },
},{
    timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema);
```

<br>
<br>

### Step 5: Update Controllers for CRUD Operations
Modify your controllers to interact with MongoDB using Mongoose models.

_📂 controllers/contactController.js_
```jsx
const expressAsyncHandler = require("express-async-handler");
const ERROR_RESPONSES = require("../constant/ERROR_RESPONSES");
const Contact = require("../models/contactModel");

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getContacts = expressAsyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// @desc    Get a single contact
// @route   GET /api/contacts/:id
// @access  Public
const getContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Public
const createContact = expressAsyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json(ERROR_RESPONSES[400]);
    return;
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Public
const updateContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Public
const deleteContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json({ message: "Contact deleted", contact });
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

Think of setting up a database like organizing a filing cabinet for each employee record has its own folder containing their details. By creating a schema model, you define what information goes into each folder(name, email, and phone), ensuring consistency across all records.

This way, your application can efficiently store, retrieve, and manage data, much like how an organized filing system makes it easy to find any employee's information quickly!

<br>
<br>

[NEXT ➡ Authentication: Adding User Routes and Controllers](https://github.com/RajonDey/node-express-quickstart/blob/main/STEPS/step-7.0.md)
