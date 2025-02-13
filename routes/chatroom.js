const express = require("express");
const router = express.Router();

const { disconnect } = require("../controllers/utils");
const { getChatPage } = require("../controllers/chatroom_controller");

/**
 * GET request to render the chat page.
 */
router.get("/", getChatPage);

/**
 * POST request to handle user disconnection.
 */
router.post("/", disconnect);

module.exports = router;
