var dot = require('gl-vec2/dot')
var cross = require('gl-vec2/cross')
var length = require('gl-vec2/length')

var EPSILON = 0.00001
var tmpv0 = [0,0]
var tmpv1 = [0,0]

module.exports = function sat2d (poly0, poly1, epsilon) {
  if (epsilon === undefined) epsilon = EPSILON
  for (var i = 0; i < poly0.separatingAxes.length; i++) {
    if (!check(poly0, poly1, poly0.separatingAxes[i])) return false
  }
  for (var i = 0; i < poly1.separatingAxes.length; i++) {
    if (!check(poly0, poly1, poly1.separatingAxes[i])) return false
  }
  for (var i = 0; i < poly0.separatingAxes.length; i++) {
    for (var j = 0; j < poly1.separatingAxes.length; j++) {
      cross(tmpv0,poly0.separatingAxes[i],poly1.separatingAxes[j])
      if (length(tmpv0) <= epsilon) continue
      if (!check(poly0, poly1, tmpv0)) return false
    }
  }
  return true
}

function check (poly0, poly1, N) {
  var min0 = +Infinity, max0 = -Infinity
  var min1 = +Infinity, max1 = -Infinity
  for (var j = 0; j < poly0.positions.length; j++) {
    var d = dot(poly0.positions[j],N)
    if (d < min0) min0 = d
    if (d > max0) max0 = d
  }
  for (var j = 0; j < poly1.positions.length; j++) {
    var d = dot(poly1.positions[j],N)
    if (d < min1) min1 = d
    if (d > max1) max1 = d
  }
  if (min0 > max1 || max0 < min1) return false // no overlap
  return true
}
