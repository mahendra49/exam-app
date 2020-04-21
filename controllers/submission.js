const codingSubmit = require("./helper/coding_submit");
const multipleChoiceSubmit = require("./helper/multiple_choice_submit");

function getSubmitter(type) {
  switch (type) {
    case "coding":
      return codingSubmit;
      break;
    case "test":
      return multipleChoiceSubmit;
    default:
      return null;
      break;
  }
}

/* 
  FOR SUBMIT_BODY FORMAT SEE CODE_SUBMISSION MODEL AND FOR MC FORMAT SEE
  MC_SUBMISSION MODEL

*/
const submit = async (req, res, next) => {
  //1. validation and sanitize

  //2. all details related to the submit, also check if all details are passed[neccsary details]
  const submit_type = req.params.type;
  const _user = req.session.user;
  const submit_body = req.body;

  const Submitter = getSubmitter(submit_type);

  if (!Submitter)
    res
      .status(500)
      .send({ error: true, message: "Error occured, please check the url" });

  try {
    //pass all other details like req.session.user and test_id and question_id
    const submit_result = await Submitter._submit(_user, submit_body);
    res.status(200).send(submit_result);
  } catch (error) {
    res
      .status(500)
      .send({ error: true, message: "error in submission" + error });
  }
};

module.exports = { submit };
