const Controller = require("../controllers/UserController");
const router = require("express").Router();

router.post("/login", Controller.postLogin);

router.post("/add-user", Controller.postRegister);

router.post("/google-login", Controller.googleLogin);

module.exports = router;
