// MCSubmission = MultipleChoiceSubmission
const MCSubmission = require("../../models/multiple_choice_submission");

/**
 * Evaluate the multiple choice questions
 *
 * @param {object} user User data from session
 * @param {object} body Details like test_id, and test_solutions
 */
const _submit = async (user, body) => {
  const username = user.username;
  const test_id = body.test_id;
  const submissions = body.submissions;

  const mc_submission = { username, test_id, submissions };
  //1. validate all the data

  //2. save the data
  try {
    const _submission = await MCSubmission.create(mc_submission);
    return { error: false, message: "Test submitted successfully" };
  } catch (err) {
    console.log(`Error --- in submitting test(Multiple Choice)--${err}`);
    return null;
  }
};

module.exports = { _submit };
