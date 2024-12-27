const Controller = require("../controllers/popularController");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", Controller.getAllGames);
router.post("/", Controller.addGame);
router.get("/:id", Controller.getGameById);
router.put("/:id", Controller.updateGame);
router.delete("/:id", Controller.deleteGame);

module.exports = router;
