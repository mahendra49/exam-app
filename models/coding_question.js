const mongoose = require("mongoose");

/* 

//sample data

{
  "question_statement":"sample",
  "input_description": "some input description",
  "output_description" : "some output description",
  "sample_test_case" : {
    "input": "some input for sample input",
    "output": "expected output"
  },
  "test_cases" : [
    {
      "input": "hidden1",
      "output": "expected ouput hidden1",
      "score": 5
    },
    {
      "input": "hidden2 input",
      "output": "expected output hidden2"
    }

  ],
  "question_solution": "#include<stdo.h>"
}

*/

const codingQuestionSchema = new mongoose.Schema({
  question_statement: {
    type: String,
    required: [true, "problem statement required"]
  },
  input_description: {
    type: String,
    required: [true, "input description statement required"]
  },
  output_description: {
    type: String,
    required: [true, "output statement required"]
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
        max: [10, "max score for each test score is 10"],
        default: 0
      }
    }
  ],
  question_solution: { type: String }
});

module.exports = mongoose.model("CodingQuestion", codingQuestionSchema);
