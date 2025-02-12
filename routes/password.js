const express = require("express");
const router = express.Router();
const { getPasswordPage, postPasswordPage } = require("../controllers/password_controller");

router.get("/", getPasswordPage);

router.post("/", postPasswordPage);

module.exports = router;
