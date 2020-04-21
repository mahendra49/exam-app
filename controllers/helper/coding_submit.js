const CodingSubmission = require("../../models/coding_submission");
const config = require("../../configs");
const Judger = require("../../code-judge");
const CodingQuestion = require("../../models/coding_question");
const Test = require("../../models/test");
const mongoose = require("mongoose");

/**
 * Run the code for a test, given the test_id, question_id and src_code and
 * language
 *
 * SEE PLAN.TXT FOR THE EXACT FORMAT
 *
 * @param {object} user all user details
 * @param {object} body contains src_code,lang,question_id,test_id
 */
const _submit = async (user, body) => {
  const username = user.username;
  const question_id = mongoose.Types.ObjectId(body.question_id);
  const test_id = mongoose.Types.ObjectId(body.test_id);
  const { source_code, lang } = body.solution;

  let question, test;

  try {
    question = await CodingQuestion.findById(question_id);
    test = await Test.findById(test_id);
  } catch (error) {
    console.log(`Error --- in finding question or test failed--${err}`);
    return;
  }

  let code_submission = null;
  try {
    // do validation here and report to master submit
    code_submission = await CodingSubmission.create({
      username: username,
      question_id: question_id,
      test_id: test_id,
      source_code: source_code,
      lang: lang
    });
  } catch (err) {
    console.log(`Error --- in creating submission--${err}`);
  }

  console.log(code_submission);
  code_submission.judge_status = config.judge.Running;
  await code_submission.save();
  const test_cases_result = code_judger(source_code, lang, question.test_cases);
  const final_result = makeTestCasesResult(
    test_cases_result,
    question.test_cases
  );

  code_submission.judge_status = final_result.judge_staus;
  code_submission.score = final_result.score;
  code_submission.test_cases = final_result.test_cases;
  await code_submission.save();

  return final_result;
};

/**
 *  Judge the given source against the following IO and return the final result
 * @param {String} source_code
 * @param {String} lang
 * @param {Array} test_cases
 */
const code_judger = (source_code, lang, test_cases = []) => {
  const test_cases_result = [];
  try {
    const Runner = Judger.getJudger(lang);
    const test_case_result = [];
    test_cases.forEach((test_case, index) => {
      const test_case_input = test_case.input;
      const test_case_result = Runner.runStr(source_code, lang, {
        input: test_case_input
      });
      test_cases_result.push({ ...test_case_result, index });
    });
  } catch (err) {
    console.log("Something went wrong for submission  " + err);
    return test_cases_result;
  }
  return test_cases_result;
};

//
const makeTestCasesResult = (test_cases_result, actual_test_cases) => {
  let accepted = Number(0);
  let score = Number(0);
  const result = {
    score: 0,
    judge_status: config.judge.Pending,
    test_cases: []
  };
  const __tt = [];
  test_cases_result.forEach((test_case, index) => {
    __tt[index] = {};
    __tt[index].score = 0;
    __tt[index].error = false;
    __tt[index].error_msg = "";
    __tt[index].error_code = null;
    if (
      !test_case.error &&
      test_case.output.trim() === actual_test_cases[index].output.trim()
    ) {
      accepted = accepted + 1;
      score = score + actual_test_cases[index].score;
      __tt[index].judge_status = config.judge.Accepted;
      __tt[index].score = actual_test_cases[index].score;
    } else if (test_case.error) {
      __tt[index].error = true;
      __tt[index].error_msg = test_case.error_msg;
      __tt[index].error_code = test_case.error_code;
    } else {
      __tt[index].error = true;
      __tt[index].error_msg = config.judge.WrongAnswer;
    }
  });

  if (accepted === 0) result.judge_status = config.judge.WrongAnswer;
  else if (accepted === test_cases_result.length)
    result.judge_status = config.judge.Accepted;
  else result.judge_status = config.judge.PartiallyAccepted;
  result.score = score;
  result.test_cases = __tt;
  console.log(result);
  return result;
};

module.exports = { _submit };
