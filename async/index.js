const bluebird = require("bluebird");

const TEST_REPEATS = 1000000;

function testCallbacks(testRepeats, mainCB) {
  function pseudoCB() {
    //console.log(testRepeats);
    if (--testRepeats === 0) {
      console.timeEnd("testCallbacks");
      mainCB();
    } else {
      process.nextTick(pseudoCB);
    }
    //(--pending === 0) && mainCB();
  }
  console.time("testCallbacks");
  process.nextTick(pseudoCB);
}

function emptyFunc() {
  return 2;
}
function resolveAsync(resolve, reject) {
  process.nextTick(resolve);
}
function testPromises(testRepeats, Promise) {
  console.time("testPromises");
  let p = new Promise(resolveAsync);
  for (var i = 1; i < testRepeats; i++) {
    p = p.then(new Promise(resolveAsync));
    //p = p.then(emptyFunc);
  }
  p = p.then(function () {
    console.timeEnd("testPromises");
  });
  return p;
}

async function testAsyncAwait(testRepeats, Promise) {
  console.time("tesAsyncAwait");
  for (var i = 0; i < testRepeats; i++) {
    var v = await new Promise(resolveAsync);
    //var v = await emptyFunc();
  }
  console.timeEnd("tesAsyncAwait");
  return 3;
}


testCallbacks(TEST_REPEATS, () => {
  testPromises(TEST_REPEATS, Promise).then(() => {
    return testPromises(TEST_REPEATS, bluebird);
  }).then(() => {
    return testAsyncAwait(TEST_REPEATS, Promise);
  }).then(() => {
    return testAsyncAwait(TEST_REPEATS, bluebird);
  });
});

//TODO: measure eating of MEMORY


//test function vs () => {}


//test double state promises

/*new Promise((resolve, reject) => {
 resolve("promise data");
 reject(new Exception("error"));
 }).then((data) => {
 console.log(data);
 throw new Exception("error2");
 }).catch(err => { //without func
 console.error(err);
 }).then(() => {
 console.log("Does 'then' work after successfull 'catch'?");
 });*/


//async return promise
/*async function foo(success) {
 if (success)
 return "olololoepepe";
 else
 throw new Exception("error");
 }

 foo(true).then((data) => {
 console.log(data);
 }).catch(err => { //without func
 console.error(err);
 });*/