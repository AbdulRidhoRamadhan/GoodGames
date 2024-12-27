const Controller = require("../controllers/ApiController");
const router = require("express").Router();

router.get("/", Controller.getGame);
router.get("/:id", Controller.getGameById);

module.exports = router;
