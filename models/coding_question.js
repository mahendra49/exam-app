const mongoose = require("mongoose");

const codingQuestionSchema = new mongoose.Schema({
  question_statement: {
    type: String,
    require: [true, "problem statement required"]
  },
  input_description: {
    type: String,
    require: [true, "input description statement required"]
  },
  output__description: {
    type: String,
    require: [true, "output statement required"]
  },
  sample_test_case: {
    input: String,
    output: String
  },
  test_cases: [
    {
      input: String,
      output: String,
      score: {
        type: Number,
        min: 0,
        max: [10, "max score for each test score is 10"]
      }
    }
  ],
  question_solution: { type: String }
});

module.exports = mongoose.model("CodingQuestion", codingQuestionSchema);
