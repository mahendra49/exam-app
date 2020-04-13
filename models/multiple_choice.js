const mongoose = require("mongoose");

/* 
  {
    "question_statement":"sample descriiption of the multiple choice",
    "choices": ["A","B","C","D"],
    "solution" : "A"
  }

 */

const multipleChoiceSchema = new mongoose.Schema({
  question_statement: {
    type: String,
    required: [true, "question statement required"]
  },
  choices: {
    type: [String],
    required: [true, "choices for question are required"],
    validate: function() {
      return this.choices.length >= 2;
    }
  },
  solution: String //only one choice possile as of now..make array here for mutiple choice
});

module.exports = mongoose.model("MultipleChoice", multipleChoiceSchema);
