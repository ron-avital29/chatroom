const express = require("express");
const router = express.Router();
const { getRegisterPage, postRegisterPage } = require("../controllers/register_controller");
const { getPasswordPage, postPasswordPage } = require("../controllers/password_controller");

router.get("/register", getRegisterPage);

router.post("/register", postRegisterPage);

router.get("/choosePassword", getPasswordPage);

router.post("/choosePassword", postPasswordPage);

module.exports = router;
