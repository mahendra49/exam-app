const questionUtil = {};

questionUt.typeOfQuestion = (question) {
  switch (question) {
    case "coding":
      return "coding";
      break;
    case "multiple_choice":
      return "multiple_choice";
      break;
  }
}

module.exports = questionUtil;
