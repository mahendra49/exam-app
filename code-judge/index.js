const c = require("./c");
const cpp = require("./c++");
const python = require("./python");
const java = require("./java");

const Runner = { c, cpp, python, java };

Runner.runStr = (source_code, lang, options) => {
  if (!(lang in Runner)) {
    throw new Error(`given ${lang} not supported`);
    return;
  }
  Runner[lang].runStr(source_code, lang, options);
};

Runner.runFile = (source_file, lang, options) => {
  if (!(lang in Runner)) {
    throw new Error(`given ${lang} not supported`);
    return;
  }
  Runner[lang].runFile(source_code, lang, options);
};

Runner.getJudger = lang => {
  if (Runner[lang.toLowerCase()]) {
    return Runner[lang.toLowerCase()];
  }

  throw new Error(`given ${lang} not supported`);
  return;
};

module.exports = Runner;
