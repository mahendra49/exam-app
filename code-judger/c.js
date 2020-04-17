const { spawnSync } = require("child_process");
const {
  getStatusObject,
  getOptionsParams,
  checkSignalTermination
} = require("./util");

const TMP_FILES = require("../configs/").TMP_FILES;

const compile = (input_file_path, object_file_path) => {
  const pc = spawnSync("gcc", [input_file_path, "-o", object_file_path]);
  return pc;
};

const execute = (object_file_path, options) => {
  const pc = spawnSync(`./${object_file_path}`, options);
  return pc;
};

const run = (filename, options) => {
  const run_status = getStatusObject();

  const input_file_path = TMP_FILES + filename + ".c";
  const object_file_path = TMP_FILES + filename + ".out";

  //compile the code
  const c_compile = compile(input_file_path, object_file_path);
  if (c_compile.status != 0) {
    run_status.error = true;
    run_status.error_msg = c_compile.stderr.toString();
    return run_status;
  }

  //execute the code with given options
  const _options = getOptionsParams(options);
  const c_execute = execute(object_file_path, _options);

  //check for signal termination
  const signal_termination = checkSignalTermination(c_execute.signal);
  if (signal_termination) {
    run_status.error = true;
    run_status.error_msg = signal_termination.error_msg;
    return run_status;
  }

  //NO errors
  run_status.output = c_execute.stdout.toString();
  run_status.input_file_path = input_file_path;
  run_status.object_file_path = object_file_path;
  return run_status;
  //check for all possible interrepts and return the final object
};

module.exports = { run };
