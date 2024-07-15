## Database setup:

Then we need to do our MongoDB setup
*   create database and create contact collection

config folder / dbConnection.js:
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


in server.js
```jsx
const connectDb = require("./config/dbConnection");

// Connect DB
connectDb();
```

Next need to create Model:
models/contactModel.js
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
now that we have created the mongoose object.


now let’s updated the contactController.js for CRUD operation and store the data in real database:
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
