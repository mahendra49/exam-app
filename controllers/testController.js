const Test = require("../models/test");

const getAllTests = async (req, res, next) => {
  try {
    const tests = await Test.find({});
    res.status(200).json(tests);
  } catch (err) {
    console.log(`Error --- in Test-get-all--${err}`);
    res
      .status(500)
      .send({ error: true, message: "Error in getting all tests" });
  }
};

const createTest = async (req, res, next) => {
  let test = req.body;
  try {
    test = await Test.create(test);
    res.status(200).send(test);
  } catch (err) {
    console.log(`Error --- in Test-create--${err}`);
    res.status(500).send({ error: true, message: "Error in creating test" });
  }
};

//  url /:id
const findTestById = async (req, res, next) => {
  const test_id = req.params.id;
  try {
    const test = await Test.findById(test_id);
    res.status(200).send(test);
  } catch (err) {
    console.log(`Error --- in Test-get-by-Id--${err}`);
    res.status(500).send({ error: true, message: "Error in finding test" });
  }
};

/* 
  /:id and req.body contains new data
*/
const findTestByIdAndUpdateTest = async (req, res, next) => {
  const test_id = req.params.id;
  const to_update_test = req.body;
  try {
    const updated_test = await Test.findByIdAndUpdate(test_id, to_update_test, {
      new: true
    });
    res.status(200).send(updated_test);
  } catch (err) {
    console.log(`Error --- in Test-update-test--${err}`);
    res.status(500).send({ error: true, message: "Error in updating test" });
  }
};

// check if test exists only then delete --- any valid ID format just gets deleted even for
// non existing ids...but the id format is right so thats a problem
const deleteTestById = async (req, res, next) => {
  const test_id = req.params.id;
  try {
    await Test.findByIdAndDelete(test_id);
    res.status(200).send({ error: false, message: "Test Deleted" });
  } catch (err) {
    console.log(`Error --- in Test-delete-test--${err}`);
    res.status(500).send({ error: true, message: "Error in deleting test" });
  }
};

module.exports = {
  getAllTests,
  createTest,
  findTestById,
  findTestByIdAndUpdateTest,
  deleteTestById
};
