const util = require("./util");
const commandLine = require("./command-line");

// Note : make sure main method class name is "Main"
const runStr = (source_code, lang, options) => {
  const tmp_dir = util.makeTmpDir();
  //copy code to tmp folder tmps filest
  const lang_ext = util.getLangExtension(lang);

  if (lang_ext !== ".java") throw new Error(`${lang} is not supported`);
  const tmp_file_path = util.makeTmpFileWithGivenData(
    tmp_dir,
    lang_ext,
    source_code
  );
  options = util.makeOptions(options, tmp_file_path);
  // some work here
  const file_name = util.pathBaseName(tmp_file_path);
  const cc_status = commandLine.execute("javac", [file_name], options);
  if (cc_status.error) return cc_status;
  const cr_status = commandLine.execute("java", ["Main"], options);
  return cr_status;
};

// Note : src_file should have main method in class "Main"
// you can change as per ur requiment
const runFile = (source_file, lang, options) => {
  const lang_ext = util.getLangExtension(lang);
  if (lang_ext !== ".java" || util.pathExtName(source_file) != ".java")
    throw new Error(`${lang} is not supported`);
  options = util.makeOptions(options, source_file);
  const file_name = util.pathBaseName(source_file);
  const cc_args = [file_name];
  const cc_status = commandLine.execute("javac", cc_args, options);
  if (cc_status.error) return cc_status;
  const cr_status = commandLine.execute("java", ["Main"], options);
  return cr_status;
};

module.exports = { runStr, runFile };
