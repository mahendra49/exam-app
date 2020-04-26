const CodingSubmission = require("../models/coding_submission");
const MCSubmission = require("../models/multiple_choice_submission");
const MultipleChoice = require("../models/multiple_choice");
const Test = require("../models/test");
const TestResult = require("../models/test-result");

const calcResultController = async (req, res, next) => {
  const test_id = req.params.id;
  try {
    const result = await calcResult(test_id);
    if (!result) {
      res.send({ error: true, message: "something went wrong" });
      return;
    }
    res.send(result);
  } catch (err) {
    console.log(`Error --- in making the result--${err}`);
    return null;
  }
};

const calcResult = async test_id => {
  let test, coding_submission, mc_submissions, test_users, all_mcsq;
  try {
    test = await Test.findById(test_id);
    coding_submission = await CodingSubmission.find({ test_id });
    mc_submissions = await MCSubmission.find({ test_id });
    test_users = test.registered_users;
    all_mcsq = await findAllMcqs(test);
  } catch (err) {
    console.log(`Error ---In Test Result Maker--${err}`);
    return;
  }
  if (!test || !coding_submission || !mc_submissions) return;
  const users_test_result = [];
  test_users.forEach(test_user => {
    user_coding_submission = _find(coding_submission, test_user);
    user_mc_submission = _find(mc_submissions, test_user);
    const coding_score = calc_coding_score(user_coding_submission);
    const multiple_choice_score = calc_mc_score(
      all_mcsq,
      user_mc_submission[0].submissions
    );
    const score = coding_score + multiple_choice_score || 0;
    users_test_result.push({
      username: test_user,
      test_id,
      coding_score,
      multiple_choice_score,
      score
    });
  });
  try {
    const results = await TestResult.insertMany(users_test_result);
    return results;
  } catch (err) {
    console.log(`Error --- in Result Updating--${err}`);
    return;
  }
};

const _find = (array, username) => {
  return array.filter(arr => arr.username === username);
};

const calc_coding_score = coding_solutions => {
  let score = Number(0);
  coding_solutions.forEach(coding_solution => {
    score = score + (coding_solution.score || 0);
  });
  return score;
};

//given all mcsq submission calc score
const calc_mc_score = (all_mcsq, UserSubmitMcqs) => {
  let score = Number(0);
  UserSubmitMcqs.forEach(mcq => {
    const _mcq = findMcqWithId(all_mcsq, mcq.multiple_choice_id);
    const is_correct = _mcq.solution === mcq.selected_choice;
    if (is_correct) score = score + 1;
  });
  return score;
};

//all db mcqs
const findMcqWithId = (all_mcsq, id) => {
  return all_mcsq.find(mcq => mcq._id.toString() === id.toString());
};

//find all mc questions with ids[]
const findAllMcqs = async test => {
  const _ids = test.questions.multiple_choice;
  console.log(_ids);
  return await MultipleChoice.find({ _id: { $in: _ids } }).lean();
};

module.exports = calcResultController;

/* 

  PLAN:
  
  get the test:
  get the users using test:
  for each user:
    calc the coding result given test_id and username
    calc the multiple choice result given test_id and username
    calc final score
  construct the DB RESULT OBJECT



  //push all the data at once

*/
