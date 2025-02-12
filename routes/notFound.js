const express = require("express");
const router = express.Router();
const { renderNotFoundPage } = require("../controllers/notfound_controller");

router.get("/", renderNotFoundPage);

module.exports = router;
