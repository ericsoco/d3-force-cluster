var tape = require('tape'),
    forceCluster = require('../');

tape('forceCluster() returns a valid force module.', function (test) {
  test.equal(typeof forceCluster, 'object');
  test.equal(typeof forceCluster.forceCluster, 'function');
  test.equal(typeof forceCluster.forceCluster(), 'function');
  test.equal(typeof forceCluster.forceCluster().initialize, 'function');
  test.equal(typeof forceCluster.forceCluster().centers, 'function');
  test.equal(typeof forceCluster.forceCluster().strength, 'function');
  test.end();
});
