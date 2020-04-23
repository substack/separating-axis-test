# separating-axis-test

Test for the intersection of 2 convex polytopes in 2d or 3d.

If an intersection exists, return the minimum translation vector.

(also called the separating axis theorem or the hyperplane separation theorem)

* http://www.dyn4j.org/2010/01/sat/
* https://en.wikipedia.org/wiki/Hyperplane_separation_theorem

# example

The examples below use axis-aligned boxes, but oriented boxes or any other
convex polytope will work too.

The examples below show nested coordinates but flat arrays work too.

## 2d example

2d example with two axis-aligned boxes:

``` js
var sat2d = require('separating-axis-test/2d')
var A = {
  separatingAxes:[[0,1],[1,0]],
  positions: [[0,1],[1,1],[1,0],[0,0]]
}
var B = {
  separatingAxes:[[0,1],[1,0]],
  positions: [[-0.6,0.5],[0.4,0.5],[0.4,-0.5],[-0.6,-0.5]]
}
var out = [0,0]
console.log(sat2d(out, A, B)) // [0.4,0]
```

## 3d example

``` js
var sat3d = require('separating-axis-test/3d')
var A = {
  separatingAxes: [[0,0,1],[0,1,0],[1,0,0]],
  positions: [
    [0,0,0],[0,1,0],[1,1,0],[1,0,0],
    [0,0,1],[0,1,1],[1,1,1],[1,0,1]
  ]
}
var B = {
  separatingAxes: [[0,0,1],[0,1,0],[1,0,0]],
  positions: [
    [-0.5,0.4,0],[0.5,0.4,0],[0.5,-0.6,0],[-0.5,-0.6,0],
    [-0.5,0.4,1],[0.5,0.4,1],[0.5,-0.6,1],[-0.5,-0.6,1]
  ]
}
var out = [0,0,0]
console.log(sat3d(out, A, B)) // [0,0.4,0]
```

# separating axes

To calculate the separating axes:

In 2d you can loop over each line segment and calculate the edge normal:

``` js
var vec2 = require('gl-vec2')
var points = [[0,0],[0.8,0.5],[0.6,-0.2]]
var separatingAxes = []
for (var i = 0; i < points.length; i++) {
  var p0 = points[i]
  var p1 = points[(i+1)%points.length]
  var edge = [ p1[1] - p0[1], p0[0] - p1[0] ]
  vec2.normalize(edge, edge)
  separatingAxes.push(edge)
}
console.log(separatingAxes)
```

In 3d you can loop over each face and compute the face normal:

``` js
var vec3 = require('gl-vec3')
var points = [[0,1,0],[1,0,0],[-1,0,0],[0,0,1]] // triangular pyramid
var cells = [[0,1,2],[0,2,3],[0,3,1],[1,2,3]]
var tmp0 = [0,0,0], tmp1 = [0,0,0]

var separatingAxes = []
for (var i = 0; i < cells.length; i++) {
  var p0 = points[cells[i][0]]
  var p1 = points[cells[i][1]]
  var p2 = points[cells[i][2]]
  vec3.subtract(tmp0, p0, p1)
  vec3.subtract(tmp1, p0, p2)
  var N = [0,0,0]
  vec3.cross(N, tmp0, tmp1)
  vec3.normalize(N, N)
  separatingAxes.push(N)
}
console.log(separatingAxes)
```

If separating axes are flipped versions of each other you can omit one to spare
some calculations. For example if you have both `[1,0]` and `[-1,0]`, you can
drop one of them.

# api

```
var sat2d = require('separating-axis-test/2d')
var sat3d = require('separating-axis-test/3d')
var {sat2d,sat3d} = require('separating-axis-test')
```

## sat2d(out, A, B)

Calculate the intersection of convex polygons `A` and `B` in 2d, storing the
minimum translation vector in `out` if the shapes intersect.

Each polygon `A` and `B` must have these fields:

* `positions` - an array of coordinates which describe the convex hull
* `separatingAxes` - an array of (normalized) axis normals to test

Coordinates and normals may be specified as nested (`[[x0,y0],[x1,y1],...]`) or
flat (`[x0,y0,x1,y1,...]`).

If there is no intersection, this function returns null.
Otherwise, it returns the minimum translation vector `out`.

## sat3d(out, A, B, epsilon=0.00001)

Calculate the intersection of convex polytopes `A` and `B` in 3d, storing the
minimum translation vector in `out` if the shapes intersect.

Each polytope `A` and `B` must have these fields:

* `positions` - an array of coordinates which describe the convex hull
* `separatingAxes` - an array of (normalized) axis normals to test

Coordinates and normals may be specified as nested
(`[[x0,y0,z0],[x1,y1,z1],...]`) or flat (`[x0,y0,z0,x1,y1,z1,...]`).

If there is no intersection, this function returns null.
Otherwise, it returns the minimum translation vector `out`.

# install

```
npm install separating-axis-test
```

# license

bsd

