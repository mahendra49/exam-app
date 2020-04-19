const clang = require("./c");
const cpplang = require("./c++");
const pythonlang = require("./python");
const javalang = require("./java");

const c = `
  #include<stdio.h>
  int main(){
    printf("using C");
    return 0;
  }
`;

const cpp = `
  #include<iostream>
  using namespace std;
  int main(){
    cout<<"using CPP"<<endl;
    return 0;
  }
`;

const python = `print("using zing zing python")`;

const java = `
  class Main{  
    public static void main(String args[]){  
     System.out.println("Hello Java");  
    }  
}  
`;

/* console.log(clang.runStr(c, "c"));
console.log(cpplang.runStr(cpp, "cpp"));
console.log(pythonlang.runStr(python, "python")); */
console.log(javalang.runStr(java, "java"));
