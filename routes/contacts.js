// routes/contacts.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
//   res.send("Get all Contacts..."); // - Simple text
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
