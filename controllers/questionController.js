//util for all Db queries for question [multiple_choice and coding]
const question_util = require("./helper/question");

/* 
	This file is best thing that I have worked on :
	_tars49

*/

//TODO : all validation of the requests pending

//Question

const getAllQuestions = async (req, res, next) => {
  try {
    const coding_questions = question_util.coding.getAll();
    const multiple_choice = question_util.multiple_choice.getAll();
    const all_questions = [...coding_questions, ...multiple_choice];
    res.status(200).send(all_questions);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: true, message: `Database Error -- ${err}` });
  }
};

/* 
	req.body contains data in format 

	{
		type:coding,
		coding:{
			data
		}
	}

	or
	{
		type:multiple_choice,
		multiple_choice:{
			
		}
	}

*/
// TODO : validation for the question body
const createQuestion = async (req, res, next) => {
  //get the type fo question and save accordingly
  const question_type = req.body.type;
  const question_body = req.body[question_type];
  const question = question_util[question_type].create(question_body);
  if (!question) {
    return res
      .status(500)
      .send({ error: true, message: "Error in creating question" });
  }
  return res.status(200).json(req.body);
};

/* 
	/:type/:id
	example-url : /multiple_choice/:id
*/
const findQuestionById = async (req, res, next) => {
  const question_type = req.params.type;
  const question_id = req.params.id;
  const question = question_util[question_type].findById(question_id);
  if (!question)
    return res
      .status(500)
      .send({ error: true, message: "Error in finding question" });

  return res.status(200).json(question);
};

/* 
	/:type/:id
	example url : /coding/:id and req.body contains new updated question in format
	{
		type:[coding,multiple_choice],
		coding:{

		}
	}
*/
const findQuestionByIdAndUpdateQuestion = async (req, res, next) => {
  const question_id = req.params.id;
  const to_update_question_type = req.params.type;
  const to_update_question_body = req.body[to_update_question_type];
  const new_updated_question = question_util[
    to_update_question_type
  ].findByIdAndUpdate(question_id, to_update_question_body);

  if (!new_updated_question)
    return res
      .status(500)
      .send({ error: true, message: "Error in updating Question" });

  return res
    .status(200)
    .send({ error: false, message: "Question updated successfully" });
};

/* 
	/:type/:id
	example url : /coding/id
*/

const deleteQuestionById = async (req, res, next) => {
  const question_id = req.params.id;
  const question_type = req.params.type;
  const question = question_util[question_type].deleteById(question_id);
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
