const { spawnSync } = require("child_process");
const { getStatusObject } = require("./util");
const { checkSignalTermination } = require("./util");

// see nodejs docx for params for spawnSync
const execute = (command, args_arr, options) => {
  //modify as per need
  const pc_status = {
    output: "",
    memory: "",
    error: false,
    error_msg: "",
    input_file_path: "",
    object_file_path: "", //[c,c++]
    time: 0
  };

  const start_time = new Date();
  const pc = spawnSync(command, args_arr, options);
  const end_time = new Date();

  //process exit code
  if (pc.status && pc.status != 0) {
    pc_status.error = true;
    pc_status.error_msg = pc.stderr.toString();
    return pc_status;
  }

  //see if terminated by signal
  const signal_termination = checkSignalTermination(pc.signal);
  if (signal_termination) {
    pc_status.error = true;
    pc_status.error_msg = signal_termination.error_msg;
    return pc_status;
  }

  // NO errors
  pc_status.output = pc.stdout ? pc.stdout.toString() : "";
  pc_status.time = (end_time.getTime() - start_time.getTime()) / 1000;
  return pc_status;
};

module.exports = { execute };
