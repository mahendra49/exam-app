const uuid = require("uuid").v4;
const fs = require("fs");
const path = require("path");

const config = require("../configs/");

function getStatusObject() {
  return {
    output: "",
    memory: "",
    error: false,
    error_msg: "",
    input_file_path: "",
    object_file_path: ""
  };
}

function getOptionsParams(params) {
  const options = {
    input: "",
    timeout: 2000
  };

  if (!params) return options;
  if (params.input) options.input = params.input;
  if (params.time) options.timeout = params.timeout;

  return options;
}

function checkSignalTermination(signal) {
  if (!signal) return null;
  if (signal === "SIGTERM")
    return { error: true, error_msg: "segmentation fault" };
  if (signal === "SIGTERM") return { error: true, error_msg: "timeout" };
  if (signal == "SIGFPE")
    return { error: true, error_msg: "floating point exception" };

  return { error: true, error_msg: `error ${signal}` };
}

function getFileExtension(lang) {
  if (!config.languages_extensions[lang])
    throw new Error(`Given lang ${lang} is not available`);
  return config.languages_extensions[lang];
}

/**
 * Returns "FILE NAME" after writing given content to file, file name would be random
 *
 * @param {String} file_content  copy code into the given file
 * @param {String} extention     file extension
 * @param {String} TDIR          all Temporary files in folder
 */
const createFile = async (file_content, extention, TDIR) => {
  const file_name = uuid();
  //const path_to_file = path.join(__dirname, TDIR, file_name + extention);
  const path_to_file = TDIR + file_name + extention;

  try {
    const file = await fs.writeFileSync(path_to_file, file_content);
    return file_name;
  } catch (err) {
    console.log(
      `Error --- in creating tmp file, make sure path is correct--${err}`
    );
  }
};

module.exports = {
  getStatusObject,
  getOptionsParams,
  checkSignalTermination,
  getFileExtension,
  createFile
};
