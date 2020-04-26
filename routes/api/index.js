var router = require("express").Router();

router.use("/", require("./user-auth"));
router.use("/tests", require("./test"));
router.use("/questions", require("./questions"));
router.use("/submission", require("./submission"));
router.use("/results", require("./make-result"));

module.exports = router;
