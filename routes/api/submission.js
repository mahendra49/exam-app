const router = require("express").Router();
const SubmissionController = require("../../controllers/submission");

router.post("/:type", SubmissionController.submit);

module.exports = router;
