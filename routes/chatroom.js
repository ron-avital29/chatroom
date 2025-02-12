const express = require("express");
const router = express.Router();
const { getChatPage, postChatPage } = require("../controllers/chatroom_controller");

router.get("/", getChatPage);

router.post("/", postChatPage);
module.exports = router;