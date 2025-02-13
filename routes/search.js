const express = require("express");
const router = express.Router();
const { getSearchPage /*postSearchPage*/ } = require("../controllers/search_controller");

router.get("/", getSearchPage);

//router.post("/", postSearchPage);

module.exports = router;
