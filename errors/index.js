// Approximate results:
// - throwError:      2387.398ms
// - returnFalse:        4.868ms
// - returnException: 2070.471ms

const TEST_REPEATS = 1000000;

function throwError(invalidArgument) {
  if (invalidArgument) {
    throw new Error("Invalid argument is passed!");
  }
  return 42;
}

function returnException(invalidArgument) {
  if (invalidArgument) {
    return new Error("Invalid argument is passed!");
  }
  return 42;
}

function returnFalse(invalidArgument) {
  if (invalidArgument) {
    return false;
  }
  return 42;
}


{
  var errCount = 0;
  console.time("throwError");
  for (var i = 0; i < TEST_REPEATS; i++) {
    try {
      throwError(true);
    } catch (err) {
      errCount++;
    }
  }
  console.timeEnd("throwError");

  var errCount = 0;
  console.time("returnFalse");
  for (var i = 0; i < TEST_REPEATS; i++) {
    var res = returnFalse(true);
    if (!res) {
      errCount++;
    }
  }
  console.timeEnd("returnFalse");

  var errCount = 0;
  console.time("returnException");
  for (var i = 0; i < TEST_REPEATS; i++) {
    var res = returnException(true);
    if (res instanceof Error) {
      errCount++;
    }
  }
  console.timeEnd("returnException");

  // NOTE: few last tests work faster or longer O_o ignore it, reorder tests
  var errCount = 0;
  //console.time("returnException");
  for (var i = 0; i < TEST_REPEATS; i++) {
    var res = returnException(true);
    if (res instanceof Error) {
      errCount++;
    }
  }
  //console.timeEnd("returnException");
}