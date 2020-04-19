const path = require("path");
const util = require("./util");
const commandLine = require("./command-line");

const runStr = (source_code, lang, options) => {
  const tmp_dir = util.makeTmpDir();
  //copy code to tmp folder tmps filest
  const lang_ext = util.getLangExtension(lang);
  if (lang_ext !== ".py") throw new Error(`${lang} is not supported`);
  const tmp_file_path = util.makeTmpFileWithGivenData(
    tmp_dir,
    lang_ext,
    source_code
  );
  const cc_args = [tmp_file_path];
  options = util.makeOptions(options);
  const cr_status = commandLine.execute("python3", cc_args, options);
  console.log(cr_status);
  return cr_status;
};

const runFile = (source_file, lang, options) => {
  const lang_ext = util.getLangExtension(lang);
  if (lang_ext !== ".py") throw new Error(`${lang} is not supported`);
  const cc_args = [source_file];
  options = util.makeOptions(options);
  const cr_status = commandLine.execute("python", cc_args, options);
  console.log(cr_status);
  return cr_status;
};

const test = `print("hello world")`;
const test_file =
  "/Users/mahendrasuthar/Desktop/testProjects/exam-app/code-judge/tmps/1d4f59e0-8222-11ea-8fa4-a70b84907106/1d4f59e1-8222-11ea-8fa4-a70b84907106.py";
runFile(test_file, "python");

module.exports = { runStr, runFile };
