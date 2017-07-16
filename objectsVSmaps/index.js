// Approximate results:
// littleMapCreating: 1048.574ms
// littleMapCreating: 24.367ms
//
// bigStringMapCreating: 1238.376ms
// bigStringObjectCreating: 1069.533ms
//
// bigNumberMapCreating: 2637.005ms
// bigNumberObjectCreating: 175.064ms
//
// bigStringMapResetting: 2626.505ms
// bigStringObjectResetting: 925.675ms
//
// bigNumberMapResetting: 1135.557ms
// bigNumberObjectResetting: 11.331ms
//
// bigStringMapGetting: 695.187ms
// bigStringObjectGetting: 984.362ms
//
// bigGettingNumberMapGetting: 817.619ms
// bigGettingNumberObjectGetting: 5.014ms

const TEST_REPEATS = 5000000;

{
  console.time("littleMapCreating");
  for (var i = 0; i < TEST_REPEATS; i++) {
    var map = new Map([
      ["key1", "value1"],
      ["key2", "value2"]
    ]);
  }
  console.timeEnd("littleMapCreating");

  console.time("littleMapCreating");
  for (var i = 0; i < TEST_REPEATS; i++) {
    var obj = {
      "key1": "value1",
      "key2": "value2"
    };
  }
  console.timeEnd("littleMapCreating");
  console.log("");


  console.time("bigStringMapCreating");
  var map = new Map();
  for (var i = 0; i < TEST_REPEATS; i++) {
    map.set(i.toString(), i);
  }
  console.timeEnd("bigStringMapCreating");

  console.time("bigStringObjectCreating");
  var obj = {};
  for (var i = 0; i < TEST_REPEATS; i++) {
    obj[i.toString()] = i;
  }
  console.timeEnd("bigStringObjectCreating");
  console.log("");


  console.time("bigNumberMapCreating");
  var map = new Map();
  for (var i = 0; i < TEST_REPEATS; i++) {
    map.set(i, i);
  }
  console.timeEnd("bigNumberMapCreating");

  console.time("bigNumberObjectCreating");
  var obj = {};
  for (var i = 0; i < TEST_REPEATS; i++) {
    obj[i] = i;
  }
  console.timeEnd("bigNumberObjectCreating");
  console.log("");


  console.time("bigStringMapResetting");
  for (var i = 0; i < TEST_REPEATS; i++) {
    map.set(i.toString(), i);
  }
  console.timeEnd("bigStringMapResetting");

  console.time("bigStringObjectResetting");
  for (var i = 0; i < TEST_REPEATS; i++) {
    obj[i.toString()] = i;
  }
  console.timeEnd("bigStringObjectResetting");
  console.log("");


  console.time("bigNumberMapResetting");
  for (var i = 0; i < TEST_REPEATS; i++) {
    map.set(i, i);
  }
  console.timeEnd("bigNumberMapResetting");

  console.time("bigNumberObjectResetting");
  for (var i = 0; i < TEST_REPEATS; i++) {
    obj[i] = i;
  }
  console.timeEnd("bigNumberObjectResetting");
  console.log("");


  console.time("bigStringMapGetting");
  for (var i = 0; i < TEST_REPEATS; i++) {
    var mapElement = map.get(i.toString());
  }
  console.timeEnd("bigStringMapGetting");

  console.time("bigStringObjectGetting");
  for (var i = 0; i < TEST_REPEATS; i++) {
    var objElement = obj[i.toString()];
  }
  console.timeEnd("bigStringObjectGetting");
  console.log("");


  console.time("bigGettingNumberMapGetting");
  for (var i = 0; i < TEST_REPEATS; i++) {
    var mapElement = map.get(i);
  }
  console.timeEnd("bigGettingNumberMapGetting");

  console.time("bigGettingNumberObjectGetting");
  for (var i = 0; i < TEST_REPEATS; i++) {
    var objElement = obj[i];
  }
  console.timeEnd("bigGettingNumberObjectGetting");
  console.log("");
}