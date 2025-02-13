const express = require("express");
const router = express.Router();
const { getLoginPage, postLoginPage } = require("../controllers/login_controller");

/**
 * GET request to render the login page.
 */
router.get("/", getLoginPage);

/**
 * POST request to handle user login.
 */
router.post("/", postLoginPage);

module.exports = router;
