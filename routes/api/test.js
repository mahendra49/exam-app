const router = require("express").Router();
const testController = require("../../controllers/testController");
//const userAuth = require("../../controllers/userAuth.js");

/* 
   GET / - get all the tests
   POST / - create a new test
   GET /:id - get post by ID
   PUT /:id - update by ID
   DELETE /:id - delete by ID

*/

//accept data as
/*{
    type:["coding","multiple_choice"],
    ["coding,","multiple_choice"]:{
        data
    }
}
*/

router.get("/", testController.getAllTests);
router.post("/", testController.createTest);
router.get("/:id", testController.findTestById);
router.put("/:id", testController.findTestByIdAndUpdateTest);
router.delete("/:id", testController.deleteTestById);

module.exports = router;
