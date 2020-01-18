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
