const express = require("express");
const router = express.Router();
const { getLoginPage, postLoginPage } = require("../controllers/login_controller");

router.get("/", getLoginPage);

router.post("/", postLoginPage);

module.exports = router;
