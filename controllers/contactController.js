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
