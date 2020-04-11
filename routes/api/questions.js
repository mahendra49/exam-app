const router = require("express").Router();
const questionController = require("../../controllers/questionController");
//const userAuth = require("../../controllers/userAuth.js");

/* 
   GET / - get all the tests
   POST / - create a new test
   GET /:id - get post by ID
   PUT /:id - update by ID
   DELETE /:id - delete by ID

*/

//questionController

router.get("/", questionController.getAllQuestions);
router.post("/", questionController.createQuestion);
router.get("/:id", questionController.findQuestionById);
router.put("/:id", questionController.findQuestionByIdAndUpdateQuestion);
router.delete("/:id", questionController.deleteQuestionById);

module.exports = router;
