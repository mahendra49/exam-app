const { Judge } = require("./code-judger");

async function test(params) {
  const source_code = `
  #include<stdio.h>
  
  int main(){
    printf("hello world");
    return 0;
  }

`;
  try {
    const lang = "c";

    const result = await Judge(source_code, lang);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

test();
