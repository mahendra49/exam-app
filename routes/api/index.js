var router = require("express").Router();

router.use("/", require("./user_auth"));
router.use("/tests", require("./test"));
router.use("/questions", require("./questions"));

module.exports = router;
