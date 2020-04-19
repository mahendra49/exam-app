const clang = require("./c");
const cpplang = require("./c++");
const pythonlang = require("./python");
const javalang = require("./java");

const c =
  "/Users/mahendrasuthar/Desktop/testProjects/exam-app/code-judge/tmps/a1a5c1c0-8254-11ea-99db-c11a917e739c/a1a636f0-8254-11ea-99db-c11a917e739c.c";

const cpp =
  "/Users/mahendrasuthar/Desktop/testProjects/exam-app/code-judge/tmps/52452b70-8254-11ea-a7d8-eb426b1a9dbf/52455280-8254-11ea-a7d8-eb426b1a9dbf.cpp";
const python =
  "/Users/mahendrasuthar/Desktop/testProjects/exam-app/code-judge/tmps/c912d5e0-8254-11ea-95de-739b9ff320c8/c912d5e1-8254-11ea-95de-739b9ff320c8.py";

const java =
  "/Users/mahendrasuthar/Desktop/testProjects/exam-app/code-judge/tmps/eedfd1c0-8258-11ea-85bb-ed82a6c5bafd/eee046f0-8258-11ea-85bb-ed82a6c5bafd.java";
/* 
console.log(clang.runFile(c, "c"));
console.log(cpplang.runFile(cpp, "cpp"));
console.log(pythonlang.runFile(python, "python")); */
console.log(javalang.runFile(java, "java"));
