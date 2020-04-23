var dot = require('gl-vec2/dot')
var minOverlap = Infinity
var N = [0,0]
var P = [0,0]
var isSFlatA = false
var isSFlatB = false
var isPFlatA = false
var isPFlatB = false

module.exports = function sat2d (out, A, B) {
  minOverlap = Infinity
  isSFlatA = !Array.isArray(A.separatingAxes[0])
  isSFlatB = !Array.isArray(B.separatingAxes[0])
  isPFlatA = !Array.isArray(A.positions[0])
  isPFlatB = !Array.isArray(B.positions[0])
  if (isSFlatA) { // flat
    for (var i = 0; i < A.separatingAxes.length; i+=2) {
      N[0] = A.separatingAxes[i+0]
      N[1] = A.separatingAxes[i+1]
      if (!check(out, A, B, N)) return null
    }
  } else { // nested
    for (var i = 0; i < A.separatingAxes.length; i++) {
      if (!check(out, A, B, A.separatingAxes[i])) return null
    }
  }
  if (isSFlatB) { // flat
    for (var i = 0; i < B.separatingAxes.length; i+=2) {
      N[0] = B.separatingAxes[i+0]
      N[1] = B.separatingAxes[i+1]
      if (!check(out, A, B, N)) return null
    }
  } else { // nested
    for (var i = 0; i < B.separatingAxes.length; i++) {
      if (!check(out, A, B, B.separatingAxes[i])) return null
    }
  }
  return out
}

function check (out, A, B, N) {
  var min0 = +Infinity, max0 = -Infinity
  var min1 = +Infinity, max1 = -Infinity
  if (isPFlatA) {
    for (var j = 0; j < A.positions.length; j+=2) {
      P[0] = A.positions[j+0]
      P[1] = A.positions[j+1]
      var d = dot(P,N)
      if (d < min0) min0 = d
      if (d > max0) max0 = d
    }
  } else {
    for (var j = 0; j < A.positions.length; j++) {
      var d = dot(A.positions[j],N)
      if (d < min0) min0 = d
      if (d > max0) max0 = d
    }
  }
  if (isPFlatB) {
    for (var j = 0; j < B.positions.length; j+=2) {
      P[0] = B.positions[j+0]
      P[1] = B.positions[j+1]
      var d = dot(P,N)
      if (d < min1) min1 = d
      if (d > max1) max1 = d
    }
  } else {
    for (var j = 0; j < B.positions.length; j++) {
      var d = dot(B.positions[j],N)
      if (d < min1) min1 = d
      if (d > max1) max1 = d
    }
  }
  if (min0 > max1 || max0 < min1) return false
  var overlap = Math.max(min1-max0,max1-min0)
  if (overlap < minOverlap) {
    minOverlap = overlap
    out[0] = N[0] * overlap
    out[1] = N[1] * overlap
  }
  return true
}
