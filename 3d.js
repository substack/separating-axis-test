var dot = require('gl-vec3/dot')
var cross = require('gl-vec3/cross')
var length = require('gl-vec3/length')

var EPSILON = 0.00001
var tmpv0 = [0,0,0]
var tmpv1 = [0,0,0]

module.exports = function sat3d (A, B, epsilon) {
  if (epsilon === undefined) epsilon = EPSILON
  for (var i = 0; i < A.separatingAxes.length; i++) {
    if (!check(A,B,A.separatingAxes[i])) return false
  }
  for (var i = 0; i < B.separatingAxes.length; i++) {
    if (!check(A,B,B.separatingAxes[i])) return false
  }
  for (var i = 0; i < A.separatingAxes.length; i++) {
    for (var j = 0; j < B.separatingAxes.length; j++) {
      cross(tmpv0,A.separatingAxes[i],B.separatingAxes[j])
      if (length(tmpv0) <= epsilon) continue
      if (!check(A,B,tmpv0)) return false
    }
  }
  return true
}

function check (A, B, N) {
  var min0 = +Infinity, max0 = -Infinity
  var min1 = +Infinity, max1 = -Infinity
  for (var j = 0; j < A.positions.length; j++) {
    var d = dot(A.positions[j],N)
    if (d < min0) min0 = d
    if (d > max0) max0 = d
  }
  for (var j = 0; j < B.positions.length; j++) {
    var d = dot(B.positions[j],N)
    if (d < min1) min1 = d
    if (d > max1) max1 = d
  }
  if (min0 > max1 || max0 < min1) return false
  return true
}
