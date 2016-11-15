# d3-force-cluster

Modular force for use with D3's [`forceSimulation`](https://github.com/d3/d3-force#forceSimulation).

Pulls nodes toward a set of cluster center nodes / points. Works well with a [collision force](https://github.com/d3/d3-force/blob/master/README.md#collision) to pack nodes together in clusters with no overlap.

Adapted from Mike Bostock's [Clustered Force Layout III](https://bl.ocks.org/mbostock/7881887).

[![Build Status](https://travis-ci.org/ericsoco/d3-force-cluster.svg?branch=master)](https://travis-ci.org/ericsoco/d3-force-cluster)


## Installing

#### npm

`npm install d3-force-cluster`

#### CDN, via `<script>`

`<script src="https://wzrd.in/standalone/d3-force-cluster@latest"></script>`

#### Local, via `<script>`

Download the [latest release](https://github.com/ericsoco/d3-force-cluster/releases/latest)

`<script src="./d3-force-cluster.min.js"></script>`

#### [UNPKG](https://unpkg.com/)

`<script src="https://unpkg.com/d3-force-cluster@latest"></script>`


## Usage

### Accessing the module

The install method you use determines the syntax for accessing the module in your code:

#### npm

Import the `forceCluster()` method and use it in a `forceSimulation`.

```
import { forceCluster } from 'd3-force-cluster'
// ...
d3.forceSimulation
	.force('cluster', forceCluster());
```

#### via `<script>`, [UNPKG](https://unpkg.com/)

The `forceCluster()` method is available in the global `d3` namespace.

```
d3.forceSimulation
	.force('cluster', d3.forceCluster());
```

### Using the module

Add a `'cluster'` force just like you would any other D3 force module:

```
// add a clustering force to pull nodes toward their assigned cluster center node
d3.forceSimulation()
  // cluster by section
  .force('cluster', forceCluster()	// see 'Accessing the module' above for the correct syntax
    .centers(function (d) { return clusters[d.cluster]; })
    .strength(0.2)
    .centerInertia(0.1))
```

More detailed examples:
- [Simple cluster layout](http://bl.ocks.org)
- [Centered cluster layout](http://bl.ocks.org)


## API

The [`forceCluster`](https://github.com/ericsoco/d3-force-cluster/blob/master/lib/forceCluster.js) module follows the [basic interface described in d3-force](https://github.com/d3/d3-force/blob/master/README.md#forces), additionally implementing the following:

<a name="cluster_initialize" href="#cluster_initialize">#</a> <i>cluster</i>.<b>initialize</b>(<i>nodes</i>) [<>](https://github.com/ericsoco/d3-force-cluster/blob/master/lib/forceCluster.js#L52 "Source")

Assigns the array of *nodes* to this force. This method is called when a force is bound to a simulation via [*simulation*.force](https://github.com/d3/d3-force/blob/master/README.md#simulation_force) and when the simulation’s nodes change via [*simulation*.nodes](https://github.com/d3/d3-force/blob/master/README.md#simulation_nodes). A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.

<a name="cluster_centers" href="#cluster_centers">#</a> <i>cluster</i>.<b>centers</b>([<i>centers</i>]) [<>](https://github.com/ericsoco/d3-force-cluster/blob/master/lib/forceCluster.js#L62 "Source")

If *centers* is specified, specifies the center nodes or points of each force cluster. If *centers* is not specified, returns the current Array of centers.
`// TODO: finish`
the force centers to the specified number in the range [0,1] and returns this force. 

<a name="cluster_strength" href="#cluster_strength">#</a> <i>cluster</i>.<b>strength</b>([<i>strength</i>]) [<>](https://github.com/ericsoco/d3-force-cluster/blob/master/lib/forceCluster.js#L79 "Source")

If *strength* is specified, sets the force strength to the specified number in the range [0,1] and returns this force. If *strength* is not specified, returns the current strength, which defaults to 0.1.

This parameter determines the attraction strength of each node to the specified (via [*cluster*.centers](#cluster_centers)) cluster center node/position.

<a name="cluster_centerInertia" href="#cluster_centerInertia">#</a> <i>cluster</i>.<b>centerInertia</b>([<i>centerInertia</i>]) [<>](https://github.com/ericsoco/d3-force-cluster/blob/master/lib/forceCluster.js#L91 "Source")

If *centerInertia* is specified, sets the inertia of cluster center nodes to the specified number in the range [0,1] and returns this force. If *centerInertia* is not specified, returns the current center inertia, which defaults to 0.

Lower values (close to 0.0) result in cluster center nodes with lower inertia: they are easily pulled around by other nodes in the cluster. Higher values (close to 1.0) result in cluster center nodes that are moved very little by other nodes in the cluster.


## Building and testing

Install [nvm](http://nvm.sh) and [npm](http://npmjs.com) if you haven't already.

Build with the following commands:

```bash
nvm use
npm install
npm run dist
```

Test with `npm run test`.
