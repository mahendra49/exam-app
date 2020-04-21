const mongoose = require("mongoose");
const MULTIPLE_CHOICE = require("../configs").multiple_choice;

/* 

  test_id:"Id",
  submission:[
    {
      multiple_choice_id:
      selected_choice:[]
    }
  ]  

*/

const multipleChoiceSubmission = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username required for submitting"]
  },
  test_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "test_id is required"]
  },
  submission: [
    {
      multiple_choice_id: mongoose.Types.ObjectId,
      selected_choice: {
        type: [String],
        default: MULTIPLE_CHOICE.default_selected_choice
      }
    }
  ]
});

multipleChoiceSubmission.pre("validate", function(next) {
  const _mcs = this.submission;
  _mcs.forEach(mc => {
    if (!mc.multiple_choice_id)
      next(new Error("multiple choice ID not specfied for some MC questions"));
    if (!mc.selected_choice)
      mc.selected_choice = MULTIPLE_CHOICE.default_selected_choice;
  });
  next();
});

multipleChoiceSubmission.pre("save", function(next) {
  this.test_id = mongoose.Types.ObjectId(this.test_id);
  this.submission.forEach(_sub => {
    _sub.multiple_choice_id = mongoose.Types.ObjectId(_sub.multiple_choice_id);
  });
  next();
});

module.exports = mongoose.model(
  "MultipleChoiceSubmission",
  multipleChoiceSubmission
);
