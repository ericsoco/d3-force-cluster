/**
 * Pulls nodes toward a set of cluster center nodes / points.
 * Adapted from Mike Bostock's Clustered Force Layout III:
 * https://bl.ocks.org/mbostock/7881887
 */
function cluster (centers) {

  let nodes,
    centerpoints = [],
    strength = 0.1;

  // coerce centers accessor into a function
  if (typeof centers !== 'function') centers = () => centers;

  function force (alpha) {
    // scale + curve alpha value
    alpha *= strength * alpha;

    nodes.forEach((d, i) => {
      let c = centerpoints[i];
      if (!c || c === d) return;
      
      let x = d.x - c.x,
        y = d.y - c.y,
        l = Math.sqrt(x * x + y * y),
        r = d.radius + (c.radius || 0);

      if (l != r) {
        l = (l - r) / l * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        c.x += x;
        c.y += y;
      }
    });
  }

  function initialize () {
    if (!nodes) return;

    // populate local `centerpoints` using `centers` accessor
    let i, n = nodes.length;
    centerpoints = new Array(n);
    for (i = 0; i < n; i++) centerpoints[i] = centers(nodes[i], i, nodes);
  }

  force.initialize = _ => {
    nodes = _;
    initialize();
  }

  /**
   * An array of objects representing the centerpoint of each cluster,
   * or a function that returns such an array.
   * Each object must have `x` and `y` values, and optionally `radius`.
   */
  force.centers = _ => {
    // keep existing value if passed invalid value
    if (_ == null) return _ = centers;

    // coerce centers accessor into a function
    centers = typeof _ === 'function' ? _ : (n, i) => _[i];

    // reinitialize
    initialize();

    // allow chaining
    return force;
  }

  force.strength = _ => {
    return _ == null ? strength : (strength = +_, force);
  };

  return force;

}

export default cluster;