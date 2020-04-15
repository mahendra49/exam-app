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
  OutputLimitExceed: 8
};

config.multiple_choice = {
  default_selected_choice: "NONE"
};

config.language = ["c++", "java", "c", "python"];

module.exports = config;
