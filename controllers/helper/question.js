const CodingQuestion = require("../../models/coding_question");
const MultipleChoice = require("../../models/multiple_choice");

const question_util = {
  coding: {
    getAll: async params => {
      try {
        const questions = await CodingQuestion.find({});
        return question;
      } catch (err) {
        console.log(`Error --- in coding-getAll--${err}`);
        return null;
      }
    },
    create: async body => {
      try {
        const question = await CodingQuestion.create(body);
        return question;
      } catch (err) {
        console.log(`Error --- in coding-create--${err}`);
        return null;
      }
    },
    findById: async id => {
      try {
        const question = await CodingQuestion.findById(id);
        return question;
      } catch (err) {
        console.log(`Error --- in coding-find By Id--${err}`);
        return null;
      }
    },
    findByIdAndUpdate: async (id, body) => {
      try {
        const question = await CodingQuestion.findByIdAndUpdate(id, body);
        return question;
      } catch (err) {
        console.log(`Error --- in coding-find By Id and Update--${err}`);
        return null;
      }
    },
    deleteById: async id => {
      try {
        const question = await CodingQuestion.findByIdAndDelete(id);
        return true;
      } catch (err) {
        console.log(`Error --- in coding-delete--${err}`);
        return null;
      }
    }
  },
  multiple_choice: {
    getAll: async params => {
      try {
        const questions = await MultipleChoice.find({});
        return question;
      } catch (err) {
        console.log(`Error --- in multiple choice-getAll--${err}`);
        return null;
      }
    },
    create: async body => {
      try {
        const question = await MultipleChoice.create(body);
        return question;
      } catch (err) {
        console.log(`Error --- in multiple choice-create--${err}`);
        return null;
      }
    },
    findById: async id => {
      try {
        const question = await MultipleChoice.findById(id);
        return question;
      } catch (err) {
        console.log(`Error --- in multiple choice-find By Id--${err}`);
        return null;
      }
    },
    findByIdAndUpdate: async (id, body) => {
      try {
        const question = await MultipleChoice.findByIdAndUpdate(id, body);
        return question;
      } catch (err) {
        console.log(
          `Error --- in multiple choice-find By Id and Update--${err}`
        );
        return null;
      }
    },
    deleteById: async id => {
      try {
        const question = await CodingQuestion.findByIdAndDelete(id);
        return true;
      } catch (err) {
        console.log(`Error --- in multiple choice delete -delete--${err}`);
        return null;
      }
    }
  },
  typeOfQuestion: function(q_type) {
    switch (q_type) {
      case "coding":
        return "coding";
        break;
      case "multiple_choice":
        return "multiple_choice";
        break;
    }
  }
};

module.exports = question_util;
