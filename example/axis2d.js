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
