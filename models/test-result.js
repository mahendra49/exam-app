const mongoose = require("mongoose");

const TestResultSchema = new mongoose.Schema({
  test_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "test_id is required"]
  },
  username: {
    type: String,
    required: [true, "username is required"]
  },
  multiple_choice_score: {
    type: Number,
    default: 0
  },
  coding_score: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("TestResult", TestResultSchema);
