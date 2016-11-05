var tape = require('tape'),
  sinon = require('sinon'),
  forceCluster = require('../');

tape('forceCluster() returns a valid force module.', function (test) {
  var unit = forceCluster.forceCluster();
  test.equal(typeof forceCluster, 'object');
  test.equal(typeof forceCluster.forceCluster, 'function');
  test.equal(typeof unit, 'function');
  test.equal(typeof unit.initialize, 'function');
  test.equal(typeof unit.centers, 'function');
  test.equal(typeof unit.strength, 'function');
  test.equal(typeof unit.centerInertia, 'function');
  test.end();
});

tape('initialize(nodes) calls center accessor once for each node', function (test) {
  var stub = sinon.stub(),
    nodes = [{}, {}, {}],
    unit = forceCluster.forceCluster();
  unit.centers(stub);
  unit.initialize(nodes);
  test.equal(stub.callCount, nodes.length);
  test.end();
});

tape('centers(const) wraps in a function and returns the force', function (test) {
  var unit = forceCluster.forceCluster();
  test.equal(unit.centers([0, 0]), unit);
  test.equal(typeof unit.centers(), 'function');
  test.end();
});

tape('centers(fn) calls fn once for each node and returns the force', function (test) {
  var stub = sinon.stub(),
    nodes = [{}, {}, {}],
    unit = forceCluster.forceCluster();
  unit.initialize(nodes);
  test.equal(unit.centers(stub), unit);
  test.equal(stub.callCount, nodes.length);
  test.end();
});

tape('centers() returns the accessor', function (test) {
  var unit = forceCluster.forceCluster();
  test.equal(typeof unit.centers(), 'function');
  test.end();
});

tape('strength(const) sets the value and returns the force', function (test) {
  var unit = forceCluster.forceCluster(),
    value = 1;
  test.equal(unit.strength(value), unit);
  test.equal(unit.strength(), value);
  test.end();
});

tape('centerInertia(const) sets the value and returns the force', function (test) {
  var unit = forceCluster.forceCluster(),
    value = 1;
  test.equal(unit.centerInertia(value), unit);
  test.equal(unit.centerInertia(), value);
  test.end();
});
