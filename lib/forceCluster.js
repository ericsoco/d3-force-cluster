/**
 * Pulls nodes toward a set of cluster center nodes / points.
 * Adapted from Mike Bostock's Clustered Force Layout III:
 * https://bl.ocks.org/mbostock/7881887
 */
function cluster (centers) {

  let nodes,
    centerpoints = [],
    strength = 0.1,
    centerInertia = 0.0;

  // coerce centers accessor into a function
  if (typeof centers !== 'function') centers = () => centers;

  function force (alpha) {
    // scale + curve alpha value
    alpha *= strength * alpha;

    let c, x, y, l, r;
    nodes.forEach((d, i) => {
      c = centerpoints[i];
      if (!c || c === d) return;
      
      x = d.x - c.x,
      y = d.y - c.y,
      l = Math.sqrt(x * x + y * y),
      r = d.radius + (c.radius || 0);

      if (l && l != r) {
        l = (l - r) / l * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        c.x += (1 - centerInertia) * x;
        c.y += (1 - centerInertia) * y;
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
  
  /**
   * Reinitialize the force with the specified nodes.
   */
  force.initialize = _ => {
    nodes = _;
    initialize();
  };

  /**
   * An array of objects representing the centerpoint of each cluster,
   * or a function that returns such an array.
   * Each object must have `x` and `y` values, and optionally `radius`.
   */
  force.centers = _ => {
    // return existing value if no value passed
    if (_ == null) return centers;

    // coerce centers accessor into a function
    centers = typeof _ === 'function' ? _ : (n, i) => _[i];

    // reinitialize
    initialize();

    // allow chaining
    return force;
  };

  /**
   * Strength of attraction to the cluster center node/position.
   */
  force.strength = _ => {
    return _ == null ? strength : (strength = +_, force);
  };

  /**
   * Inertia of cluster center nodes/positions.
   * Higher values mean the cluster center moves less;
   * lower values mean the cluster center is more easily
   * pulled around by other nodes in the cluster.
   * Typical values range from 0.0 (cluster centers move as much as all other nodes)
   * to 1.0 (cluster centers are not moved at all by the clustering force).
   */
  force.centerInertia = _ => {
    return _ == null ? centerInertia : (centerInertia = +_, force);
  };

  return force;

}

export default cluster;