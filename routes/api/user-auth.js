const router = require("express").Router();
const userAuth = require("../../controllers/userAuthController");

router.post("/login", userAuth.login);
router.post("/register", userAuth.register);
router.get("/logout", userAuth.logout);

module.exports = router;
