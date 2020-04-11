//const Test = require("../models/test");
//Question

//handle both coding and multiple choice question here

const getAllQuestions = async (req, res, next) => {
  res.send("all questions");
};

const createQuestion = async (req, res, next) => {
  res.send("question created");
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

module.exports = {
  getAllQuestions,
  createQuestion,
  findQuestionById,
  findQuestionByIdAndUpdateQuestion,
  deleteQuestionById
};
