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
