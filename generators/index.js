// directory: https://learn.javascript.ru/generator

// NOTE: Allocating of memory eats a lot of time!
// functionDeclaration:   692.286ms
// simpleGenerator:     17618.050ms
// moreUsefulFunction:   1470.790ms
// moreUsefulGenerator:     0.150ms

const fs = require("fs");

const SIMPLE_TEST_REPEATS = 100000000;
const SIMPLE_GENERATOR_REPEATS = SIMPLE_TEST_REPEATS / 5; // 'cause it returns 5x more results
const USEFUL_TEST_REPEATS = 100000000;


function functionDeclaration() {
  return Math.random();
}

function* simpleGenerator() {
  yield Math.random();
  yield Math.random();
  yield Math.random();
  yield Math.random();
  return Math.random();
}

/** Emulates typical work with enumerated data and arrays (where generators can be used)
 * @return {Array}
 */
function moreUsefulFunction(repeats) {
  // var arr = new Array(repeats);
  // for (var i = 0; i < repeats; i++) {
  //   arr[i] = i; // seeks memory every time. "True optimizers" are sad
  // }
  // return arr;
  var arr = [];
  for (var i = 0; i < repeats; i++) {
    arr.push(i); // allocates memory peace by peace. GC and "true optimizers" are sad
  }
  return arr;
}

function* moreUsefulGenerator(repeats) {
  var constraint = repeats - 1;
  for (var i = 0; i < constraint; i++) {
    yield i; // no memory allocations here. GC and "true optimizers" should smile
  }
  return constraint;
}

/**
 * Negative each number in array or generator and return new array.
 * Emulates a following processing of enumerated data
 * @param enumeratedObj {Array|function}
 */
function negativeEnumeratedObj(enumeratedObj) {
  var arr = [];
  for (var num of enumeratedObj) {
    arr.push(-1 * num);
  }
  return arr;
}


{
  var res = 1;
  console.time("functionDeclaration");
  var i = 0;
  do {
    res *= functionDeclaration();
    i++;
  } while (i < SIMPLE_TEST_REPEATS);
  console.timeEnd("functionDeclaration");

  console.time("simpleGenerator");
  var i = 0;
  do {
    var gen = simpleGenerator(); // Garbage collector hates us for this, I guess
    // var step;
    // do {
    //   step = gen.next(); // every time new object is created, memory is allocated. GC hates us again.
    //   res *= step.value;
    // } while (!step.done);
    for (var value of gen) {
      res *= value;
    }
    i++;
  } while (i < SIMPLE_GENERATOR_REPEATS);
  console.timeEnd("simpleGenerator");

  console.time("moreUsefulFunction");
  var funcResult = moreUsefulFunction(USEFUL_TEST_REPEATS);
  console.timeEnd("moreUsefulFunction");
  //console.log(negativeEnumeratedObj(funcResult));

  console.time("moreUsefulGenerator");
  var gen = moreUsefulGenerator(USEFUL_TEST_REPEATS);
  console.timeEnd("moreUsefulGenerator");
  //console.log(negativeEnumeratedObj(gen));

  // NOTE: few last tests work faster O_o ignore it, reorder tests
  //console.time("functionDeclaration");
  for (var i = 0; i < SIMPLE_TEST_REPEATS; i++) {
    res *= functionDeclaration();
  }
  //console.timeEnd("functionDeclaration");
  console.log("Prevent the garbage collector and V8 from optimizations on the off-chance", res);
}