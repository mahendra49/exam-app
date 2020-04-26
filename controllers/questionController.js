const question_util = require("./helper/question");

/* 
	This file is best thing that I have worked on :
	_tars49

*/

const getAllQuestions = async (req, res, next) => {
  try {
    const question_type = req.params.type;
    const questions = await question_util[question_type].getAll();
    res.status(200).send(questions);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: true, message: `Database Error -- ${err}` });
  }
};

const createQuestion = async (req, res, next) => {
  //get the type fo question and save accordingly
  const question_type = req.params.type;
  const question_body = req.body;
  console.log(question_body);
  const question = await question_util[question_type].create(question_body);
  if (!question) {
    return res
      .status(500)
      .send({ error: true, message: "Error in creating question" });
  }
  return res.status(200).json(question);
};

const findQuestionById = async (req, res, next) => {
  const question_type = req.params.type;
  const question_id = req.params.id;
  const question = await question_util[question_type].findById(question_id);
  if (!question)
    return res
      .status(500)
      .send({ error: true, message: "Error in finding question" });

  return res.status(200).json(question);
};

const findQuestionByIdAndUpdateQuestion = async (req, res, next) => {
  const question_id = req.params.id;
  const to_update_question_type = req.params.type;
  const to_update_question_body = req.body;
  //console.log(req.body);
  const new_updated_question = await question_util[
    to_update_question_type
  ].findByIdAndUpdate(question_id, to_update_question_body);
  //console.log(new_updated_question);
  if (!new_updated_question)
    return res
      .status(500)
      .send({ error: true, message: "Error in updating Question" });

  return res
    .status(200)
    .send({ error: false, message: "Question updated successfully" });
};

const deleteQuestionById = async (req, res, next) => {
  const question_id = req.params.id;
  const question_type = req.params.type;
  const question = await question_util[question_type].deleteById(question_id);
  if (!question)
    return res
      .status(500)
      .send({ error: true, message: "Error in delete question by Id" });

  return res.status(200).send({ error: false, message: "question deleted" });
};

module.exports = {
  getAllQuestions,
  createQuestion,
  findQuestionById,
  findQuestionByIdAndUpdateQuestion,
  deleteQuestionById
};
