const router = require("express").Router();
const resultMaker = require("../../helpers/test-result-maker");

router.get("/:id", resultMaker);

module.exports = router;
