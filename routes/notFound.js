const express = require("express");
const router = express.Router();
const { renderNotFoundPage } = require("../controllers/notfound_controller");

/**
 * GET request to render the 404 Not Found page.
 */
router.get("/", renderNotFoundPage);

module.exports = router;
