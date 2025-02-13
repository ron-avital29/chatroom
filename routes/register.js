const express = require("express");
const router = express.Router();
const { getRegisterPage, postRegisterPage } = require("../controllers/register_controller");
const { getPasswordPage, postPasswordPage } = require("../controllers/password_controller");

/**
 * GET request to render the registration page.
 */
router.get("/register", getRegisterPage);

/**
 * POST request to handle user registration.
 */
router.post("/register", postRegisterPage);

/**
 * GET request to render the password selection page.
 */
router.get("/choosePassword", getPasswordPage);

/**
 * POST request to handle password submission.
 */
router.post("/choosePassword", postPasswordPage);

module.exports = router;
