const express = require("express");
const router = express.Router();

const { disconnect } = require("../controllers/utils");
const { getErrorPage } = require("../controllers/error_controller");

router.get("/", getErrorPage);

router.post("/", disconnect);
module.exports = router;
