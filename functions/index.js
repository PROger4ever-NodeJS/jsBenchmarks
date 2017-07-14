// directory: https://www.w3schools.com/js/js_function_definition.asp

// NOTE: Order of the calls makes sense!
// functionDeclaration:          793.823ms
// functionDeclarationWithCall: 1273.833ms
// functionDeclarationWithBind: 1514.881ms
// functionExpression:           788.431ms
// arrowFunction:                777.204ms
// functionConstructor:          765.344ms
// selfInvokingFunction:        3973.075ms
// eval:                        4156.917ms

const TEST_REPEATS = 100000000;

function functionDeclaration() {
  return Math.random();
}

var functionDeclarationWithBind = functionDeclaration.bind(null);

var functionExpression = function () {
  return Math.random();
};

var functionConstructor = new Function("return Math.random();");

var arrowFunction = () => Math.random();


{
  var res = 1;

  console.time("functionDeclaration");
  for (var i = 0; i < TEST_REPEATS; i++) {
    res *= functionDeclaration();
  }
  console.timeEnd("functionDeclaration");

  console.time("functionDeclarationWithCall");
  for (var i = 0; i < TEST_REPEATS; i++) {
    res *= functionDeclaration.call(null);
  }
  console.timeEnd("functionDeclarationWithCall");

  console.time("functionDeclarationWithBind");
  for (var i = 0; i < TEST_REPEATS; i++) {
    res *= functionDeclarationWithBind();
  }
  console.timeEnd("functionDeclarationWithBind");

  console.time("functionExpression");
  for (var i = 0; i < TEST_REPEATS; i++) {
    res *= functionExpression();
  }
  console.timeEnd("functionExpression");

  console.time("arrowFunction");
  for (var i = 0; i < TEST_REPEATS; i++) {
    res *= arrowFunction();
  }
  console.timeEnd("arrowFunction");

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

  // NOTE: few last tests work faster O_o ignore it, reorder tests
  //console.time("functionDeclaration");
  for (var i = 0; i < TEST_REPEATS; i++) {
    res *= functionDeclaration();
  }
  //console.timeEnd("functionDeclaration");
  console.log("Prevent the garbage collector and V8 from optimizations on the off-chance", res);
}