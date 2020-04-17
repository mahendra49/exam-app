const CodingSubmission = require("../../models/coding_submission");
const config = require("../../configs");

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
  const { test_id, question_id } = body;
  const { source_code, lang } = body.solution;

  // do validation here and report to master submit
  const code_submission = await CodingSubmission.create({
    username,
    test_id,
    question_id,
    source_code,
    lang
  });

  code_submission.judge_status = config.judge.Running;

  await code_submission.save();

  //1. construct the submission object for the compiler

  //2. get a coding submiision object and keep updating its status

  //3. save the final coding submission object based on the output of src_code
};

/**
 *
 * judge the solution and update the status to _submit
 */
const judge = async ({ question_id, source_code, lang }) => {};

module.exports = { _submit };
