const mongoose = require("mongoose");
const default_selected_choice = require("../configs").multiple_choice
  .default_selected_choice;

const multipleChoiceSubmission = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username required for submitting"]
  },
  test_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "test_id is required"]
  },
  submissions: [
    {
      multiple_choice_id: mongoose.Types.ObjectId,
      selected_choice: {
        type: [String],
        default: default_selected_choice
      }
    }
  ]
});

module.exports = mongoose.model(
  "multipleChoiceSubmission",
  multipleChoiceSubmission
);
