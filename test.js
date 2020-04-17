const { Judge } = require("./code-judger");

async function test(params) {
  const source_code = `
  #include<iostream>
  using namespace std;
  int main(){
    cout<<"hhelo world";
    return 0;
  }

`;
  try {
    const lang = "c++";

    const result = await Judge(source_code, lang);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

test();
