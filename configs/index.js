const path = require("path");

const config = {};

config.judge = {
  Pending: 0,
  Running: 1,
  CompileError: 2,
  Accepted: 3,
  RuntimeError: 4,
  WrongAnswer: 5,
  TimeLimitExceeded: 6,
  MemoryLimitExceed: 7,
  OutputLimitExceed: 8,
  PartiallyAccepted: 9,
  SegmentationFault: 10
};

config.multiple_choice = {
  default_selected_choice: "NONE"
};

config.languages = ["cpp", "java", "c", "python"];

config.TMP_FILES = path.join(__dirname, "..", "code-judger/tmps/");
config.ROOT_PATH = path.join(__dirname, "..");

config.languages_extensions = {
  "c++": ".cpp",
  java: ".java",
  c: ".c",
  python: ".py"
};

module.exports = config;
