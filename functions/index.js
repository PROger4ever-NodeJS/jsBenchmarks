//directory: https://www.w3schools.com/js/js_function_definition.asp
const TEST_REPEATS = 100000000;

function functionDeclaration() {
  return Math.random();
}

var functionExpression = function () {
  return Math.random();
};

var functionConstructor = new Function("return Math.random();");

function start() {
  var res = 1;

  console.time("functionDeclaration");
  for (var i = 0; i < TEST_REPEATS; i++) {
    res *= functionDeclaration();
  }
  console.timeEnd("functionDeclaration");

  console.time("functionExpression");
  for (var i = 0; i < TEST_REPEATS; i++) {
    res *= functionExpression();
  }
  console.timeEnd("functionExpression");

  console.time("functionConstructor");
  for (var i = 0; i < TEST_REPEATS; i++) {
    res *= functionConstructor();
  }
  console.timeEnd("functionConstructor");

  console.time("selfInvokingFunction");
  for (var i = 0; i < TEST_REPEATS; i++) {
    res *= (function () {
      return Math.random();
    })();
  }
  console.timeEnd("selfInvokingFunction");

  console.time("eval");
  for (var i = 0; i < TEST_REPEATS; i++) {
    res *= (function () {
      return Math.random();
    })();
  }
  console.timeEnd("eval");

  //NOTE: few last tests work faster O_o ignore it, reorder tests
  //console.time("functionDeclaration");
  for (var i = 0; i < TEST_REPEATS; i++) {
    res *= functionDeclaration();
  }
  //console.timeEnd("functionDeclaration");
  console.log("Prevent the garbage collector and V8 from optimizations on the off-chance", res);
}

start();