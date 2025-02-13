const express = require("express");
const router = express.Router();
const { getContacts, searchMessages, getMessages, createMessage, deleteMessage, updateMessage, getUserByEmail, getLatestMessageUpdate } = require("../controllers/api_controller");

/**
 * GET request to fetch all contacts.
 */
router.get("/contacts", getContacts);

/**
 * GET request to search messages based on a prompt.
 */
router.get("/search", searchMessages);

/**
 * GET request to fetch all messages excluding deleted ones.
 */
router.get("/messages", getMessages);

/**
 * POST request to create a new message.
 */
router.post("/messages", createMessage);

/**
 * DELETE request to delete a message.
 */
router.delete("/messages/:id", deleteMessage);

/**
 * PUT request to update a message.
 */
router.put("/messages/:id", updateMessage);

/**
 * GET request to fetch user details by email.
 */
router.get("/users/:email", getUserByEmail);

/**
 * GET request to fetch the latest message update timestamp.
 */
router.get("/messages/latest-update", getLatestMessageUpdate);

module.exports = router;
