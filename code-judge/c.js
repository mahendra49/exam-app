const path = require("path");
const util = require("./util");
const commandLine = require("./command-line");

const runStr = (source_code, lang, options) => {
  const tmp_dir = util.makeTmpDir();
  //copy code to tmp folder tmps filest
  const lang_ext = util.getLangExtension(lang);
  if (lang_ext !== ".c") throw new Error(`given ${lang} is not supported`);
  const tmp_file_path = util.makeTmpFileWithGivenData(
    tmp_dir,
    lang_ext,
    source_code
  );
  const cc_o_out_file_path = tmp_file_path.split(".")[0] + ".out";
  console.log(cc_o_out_file_path);
  const cc_args = [tmp_file_path, "-o", cc_o_out_file_path];
  const cc_status = commandLine.execute("gcc", cc_args, options);
  console.log(cc_status);
  if (cc_status.error) return cc_status;
  options = util.makeOptions(options);
  const cr_status = commandLine.execute(cc_o_out_file_path, null, options);
  console.log(cr_status);
  return cr_status;
};

const runFile = (source_file, lang, options) => {
  const lang_ext = util.getLangExtension(lang);
  if (lang_ext !== ".c") throw new Error(`${lang} is not supported`);
  const cc_o_out_file_path = source_file.split(".")[0] + ".out";
  console.log(cc_o_out_file_path);
  const cc_args = [source_file, "-o", cc_o_out_file_path];
  const cc_status = commandLine.execute("gcc", cc_args, options);
  console.log(cc_status);
  if (cc_status.error) return cc_status;
  options = util.makeOptions(options);
  const cr_status = commandLine.execute(cc_o_out_file_path, null, options);
  console.log(cr_status);
  return cr_status;
};

const test = `
  #include<stdio.h>
  int main(){while(1){}return 0;
	}
`;
/*
const run_file_path =
  "/Users/mahendrasuthar/Desktop/testProjects/exam-app/code-judge/tmps/135f7240-81fe-11ea-9d20-3d8a6f5a778d/135f9950-81fe-11ea-9d20-3d8a6f5a778d.cpp";
*/
runStr(test, "c");
//runFile(run_file_path, "cpp");

module.exports = { runStr, runFile };
