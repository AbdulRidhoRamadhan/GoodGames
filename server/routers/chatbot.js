const express = require("express");
const Gemini = require("../controllers/geminAi");
const router = express.Router();

router.post("/chat", Gemini.gemini);

module.exports = router;
