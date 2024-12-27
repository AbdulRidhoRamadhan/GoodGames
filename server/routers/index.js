const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const apiRouter = require("./api");
const popularRouter = require("./populers");
const chatbotRouter = require("./chatbot");

router.use("/users", userRouter);
router.use("/games", apiRouter);
router.use("/populars", popularRouter);
router.use("/api", chatbotRouter);

module.exports = router;
