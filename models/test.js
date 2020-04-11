const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  test_name: {
    type: String,
    required: [true, "Test Name Required"]
  },
  start_time: {
    type: Number,
    default: Date.now()
  },
  end_time: {
    type: Number,
    required: [true, "Test end time required"]
  },
  questions: {
    coding_question: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodingQuestion"
      }
    ],
    multiple_choice: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MultipleChoice"
      }
    ]
  }
});

testSchema.pre("validate", function(next) {
  if (new Date(this.start_time).getTime() > new Date(this.end_time).getTime()) {
    next(new Error("start time greater than end time"));
  }
  next();
});

module.exports = mongoose.model("Test", testSchema);
