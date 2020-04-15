const mongoose = require("mongoose");
const configs = require("../configs");

/* 
    Example : 

    {
        "username":"mahi",
        "test_id":ID,
        "question_id":ID,
        "source_code":"#inclde",
        "language":"c++",
        

    }


*/

const codingSubmissionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username required for submitting"]
  },
  test_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "test_id is required"]
  },
  question_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "question_id is required"]
  },
  source_code: String,
  language: {
    type: String,
    enum: configs.language
  },
  judge_status: {
    // pending or running ?
    type: Number,
    default: configs.judge.Pending
  },
  status: {
    //accepted, wrong answer, compiler error etc
    type: Number,
    default: configs.judge.Pending
  },
  test_cases: [],
  time: {
    type: Number,
    default: 0
  },
  memory: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  }
});

codingSubmissionSchema.virtual("isAccepted").get(function() {
  return this.judge_status === configs.judge.Accepted;
});

codingSubmissionSchema.virtual("isPending").get(function() {
  return this.judge_status === configs.judge.Pending;
});

codingSubmissionSchema.pre("validate", function(next) {
  if (!this.username) {
    next(new Error("user name is required"));
  } else if (!this.test_id) {
    next(new Error("test_id is required for the submission"));
  } else if (!this.question_id) {
    next(new Error("question_id is required to make the submission"));
  } else {
    next();
  }
});

module.exports = mongoose.model("codingSubmission", codingSubmissionSchema);
