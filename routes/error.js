const express = require("express");
const router = express.Router();

const { disconnect } = require("../controllers/utils");
const { getErrorPage } = require("../controllers/error_controller");

/**
 * GET request to render the error page.
 */
router.get("/", getErrorPage);

/**
 * POST request to handle user disconnection.
 */
router.post("/", disconnect);

module.exports = router;
