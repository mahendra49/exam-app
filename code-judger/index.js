const config = require("../configs/");
const util = require("./util");

//All available runners
const cpp = require("./c++");
const c = require("./c");

//all temporary files, override here if option provided
const TMP_FILES = config.TMP_FILES;

const Runner = {
  "c++": cpp,
  c: c
  /* java: java,
  python: python */
};

/**
 *
 * @param {String} source_code  User given SRC_CODE
 * @param {String} lang         language of SRC_CODE
 * @param {*} options 					other options like input, timeout
 */
const Judge = async (source_code, lang, options) => {
  //1. create a tmp file for the source_code to run with the lang extensions
  try {
    const extension = util.getFileExtension(lang);
    const file_name = await util.createFile(source_code, extension, TMP_FILES);
    const result = Runner[lang].run(file_name, options);
    return result;
  } catch (err) {
    console.log(`Error --- something went wrong --${err}`);
  }
};

module.exports = { Judge };
