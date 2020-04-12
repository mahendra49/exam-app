//util for all Db queries for question [multiple_choice and coding]
const question_util = require("../utils/question");

//Question

//handle both coding and multiple choice question here
//send data as
/* 
    {
        type:["coding","multiple_choice"],
        coding:{

        },
        multiple:choice:{

        }
    }


    example 1:
    {   
        //coding
        type:"coding",
        coding:{

        }
    }


    example 2:

    {   //multiple_choice
        type:"multiple_choice",
        multiple_choice:{

        }
    }

*/

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

const createQuestion = async (req, res, next) => {
  //get the type fo question and save accordingly
  const question_type = req.body.type;
};

const findQuestionById = async (req, res, next) => {
  res.send("question by Id");
};

const findQuestionByIdAndUpdateQuestion = async (req, res, next) => {
  res.send("Find questionById");
};

const deleteQuestionById = async (req, res, next) => {
  res.send("delete question by id");
};

const questionUtil = () => {};

module.exports = {
  getAllQuestions,
  createQuestion,
  findQuestionById,
  findQuestionByIdAndUpdateQuestion,
  deleteQuestionById
};
