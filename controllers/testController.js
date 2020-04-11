//const Test = require("../models/test");

const getAllTests = async (req, res, next) => {
  res.send("all tests");
};

const createTest = async (req, res, next) => {
  res.send("test created");
};

const findTestById = async (req, res, next) => {
  res.send("test by Id");
};

const findTestByIdAndUpdateTest = async (req, res, next) => {
  res.send("Find testById");
};

const deleteTestById = async (req, res, next) => {
  res.send("delete test by id");
};

module.exports = {
  getAllTests,
  createTest,
  findTestById,
  findTestByIdAndUpdateTest,
  deleteTestById
};
