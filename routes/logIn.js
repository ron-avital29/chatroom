const express = require("express");
const router = express.Router();
// const { getLoginPage, postLoginPage } = require("../controllers/login_controller");

const { getLoginPage } = require("../controllers/login_controller");

/**
 * GET request to render the login page.
 */
router.get("/", getLoginPage);

/**
 * POST request to handle login and registration logic.
 */
// router.post("/", postLoginPage);

module.exports = router;
