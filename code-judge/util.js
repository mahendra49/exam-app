const fs = require("fs");
const uuid = require("uuid").v1;
const path = require("path");

const getStatusObject = () => {
  return {
    output: "",
    memory: "",
    error: false,
    error_msg: "",
    input_file_path: "",
    object_file_path: ""
  };
};

const makeOptions = (params, cur_dir) => {
  const options = {
    input: "",
    timeout: 2000,
    cwd: pathBaseDir(cur_dir)
  };

  if (!params) return options;
  if (params.input) options.input = params.input;
  if (params.time) options.timeout = params.timeout;

  return options;
};

const checkSignalTermination = signal => {
  if (!signal) return null;

  if (signal === "SIGSEGV")
    return { error: true, error_msg: "segmentation fault" };
  if (signal === "SIGTERM")
    return { error: true, error_msg: "process timeout" };
  if (signal == "SIGFPE")
    return { error: true, error_msg: "floating point exception" };

  return { error: true, error_msg: `error ${signal}` };
};

const getLangExtension = lang => {
  lang = lang.toLowerCase();
  switch (lang) {
    case "cpp":
      return ".cpp";
      break;
    case "python":
      return ".py";
    case "java":
      return ".java";
      break;
    case "c":
      return ".c";
    default:
      throw new Error(`${lang} not found`);
      break;
  }
};

/**
 * Make a temporary in ./tmps/tmpsDir
 * This will be cleaned up after executing the command
 */
const makeTmpDir = () => {
  // outer tmp dir
  const istmpsExists = fs.existsSync("tmps");
  if (!istmpsExists) fs.mkdirSync("tmps");
  const inner_tmp_path = `./tmps/${uuid()}`;
  const inner_tmp = fs.mkdirSync(inner_tmp_path);
  return path.join(__dirname, inner_tmp_path);
};

/**
 *
 * @param {String} tmp_file_dir_path
 * @param {String} extension
 * @param {String} content
 */
const makeTmpFileWithGivenData = (tmp_file_dir_path, extension, content) => {
  //check if tmp_file_dir_path exists
  const tmp_file_path = `${tmp_file_dir_path}/${uuid()}${extension}`;
  fs.writeFileSync(tmp_file_path, content);
  return tmp_file_path;
};

const pathBaseName = (file_name, args) => path.basename(file_name, args);
const pathExtName = file_name => path.extname(file_name);
const pathBaseDir = file_path => path.dirname(file_path);

module.exports = {
  makeTmpDir,
  makeTmpFileWithGivenData,
  getLangExtension,
  getStatusObject,
  checkSignalTermination,
  makeOptions,
  pathBaseName,
  pathExtName
};
