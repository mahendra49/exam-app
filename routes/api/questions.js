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
// url format from root : localhost/api/questions/:type/:id

router.get("/:type", questionController.getAllQuestions);
router.post("/:type", questionController.createQuestion);
router.get("/:type/:id", questionController.findQuestionById);
router.put("/:type/:id", questionController.findQuestionByIdAndUpdateQuestion);
router.delete("/:type/:id", questionController.deleteQuestionById);

module.exports = router;
