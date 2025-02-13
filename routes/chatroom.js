const express = require("express");
const router = express.Router();

const { disconnect } = require("../controllers/utils");
const { getChatPage } = require("../controllers/chatroom_controller");

router.get("/", getChatPage);

router.post("/", disconnect);

module.exports = router;
