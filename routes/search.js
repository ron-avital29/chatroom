const express = require("express");
const router = express.Router();
const { getSearchPage } = require("../controllers/search_controller");

/**
 * GET request to render the search page.
 */
router.get("/", getSearchPage);

module.exports = router;
