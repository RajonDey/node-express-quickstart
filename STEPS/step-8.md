## 🔗 Relationships Between Schemas
[Branch for Source Code 📂
](https://github.com/RajonDey/node-express-quickstart/tree/6-relationship-between-data-models)

In this section, we will establish relationships between schemas to ensure that contacts are associated with specific users. This includes updating models, routes, and controllers to handle these relationships securely.

<br>

### Step 1: Update Contact Model
To associate each contact with a specific user by storing the user's ID in the contact document.

📂 models/contactModel.js
```jsx
const contactSchema = mongoose.Schema(
{
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  ... rest of the code
```
<br>

### Step 2: Protect Routes Using Middleware
To ensure that only authenticated users can access or modify their own contacts.

📂 router/contacts.js
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
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken); // Added this line before all routes
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
```
<br>
<br>

### Step 3: Update Controllers for CRUD Operations
To implement logic that ensures users can only interact with their own contacts.

📂 controllers/contactController.js
```jsx
const expressAsyncHandler = require("express-async-handler");
const ERROR_RESPONSES = require("../constant/ERROR_RESPONSES");
const Contact = require("../models/contactModel");

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = expressAsyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc    Get a single contact
// @route   GET /api/contacts/:id
// @access  Private
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
// @access  Private
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
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // check
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
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
// @access  Private
const deleteContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User doesn't have permission to delete other user's contacts"
    );
  }

  await Contact.findByIdAndDelete(req.params.id);

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

By establishing relationships between schemas and protecting routes using middleware,you ensure that data integrity is maintained, and unauthorized actions are prevented. This approach allows you to build more secure and reliable applications.

Think of it as assigning lockers to each student in a school; only the assigned student has access to their locker, making sure that personal belongings remain safe!

<br>
<br> 

🎉 Congratulations! You made it.
[Let's get back](https://github.com/RajonDey/node-express-quickstart/tree/main)
