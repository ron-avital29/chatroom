const express = require("express");
const router = express.Router();
const { getRegisterPage, postRegisterPage } = require("../controllers/register_controller");

router.get("/", getRegisterPage);

router.post("/", postRegisterPage);

module.exports = router;
