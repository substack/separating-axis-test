var dot = require('gl-vec3/dot')
var cross = require('gl-vec3/cross')
var length = require('gl-vec3/length')

var EPSILON = 0.00001
var tmpv0 = [0,0,0]
var minOverlap = Infinity
var N0 = [0,0,0]
var N1 = [0,0,0]
var P = [0,0,0]

var isSFlatA = false
var isSFlatB = false
var isPFlatA = false
var isPFlatB = false

module.exports = function sat3d (out, A, B, epsilon) {
  if (epsilon === undefined) epsilon = EPSILON
  minOverlap = Infinity
  isSFlatA = !Array.isArray(A.separatingAxes[0])
  isSFlatB = !Array.isArray(B.separatingAxes[0])
  isPFlatA = !Array.isArray(A.positions[0])
  isPFlatB = !Array.isArray(B.positions[0])
  if (isSFlatA) { // flat
    for (var i = 0; i < A.separatingAxes.length; i+=3) {
      N0[0] = A.separatingAxes[i+0]
      N0[1] = A.separatingAxes[i+1]
      N0[2] = A.separatingAxes[i+2]
      if (!check(out, A, B, N0)) return null
    }
  } else { // nested
    for (var i = 0; i < A.separatingAxes.length; i++) {
      if (!check(out, A, B, A.separatingAxes[i])) return null
    }
  }
  if (isSFlatB) { // flat
    for (var i = 0; i < B.separatingAxes.length; i+=3) {
      N0[0] = B.separatingAxes[i+0]
      N0[1] = B.separatingAxes[i+1]
      N0[2] = B.separatingAxes[i+2]
      if (!check(out, A, B, N0)) return null
    }
  } else { // nested
    for (var i = 0; i < B.separatingAxes.length; i++) {
      if (!check(out, A, B, B.separatingAxes[i])) return null
    }
  }
  if (isSFlatA && isSFlatB) {
    for (var i = 0; i < A.separatingAxes.length; i+=3) {
      N0[0] = A.separatingAxes[i+0]
      N0[1] = A.separatingAxes[i+1]
      N0[2] = A.separatingAxes[i+2]
      for (var j = 0; j < B.separatingAxes.length; j+=3) {
        N1[0] = B.separatingAxes[j+0]
        N1[1] = B.separatingAxes[j+1]
        N1[2] = B.separatingAxes[j+2]
        cross(tmpv0,N0,N1)
        if (length(tmpv0) <= epsilon) continue
        if (!check(out, A, B, tmpv0)) return null
      }
    }
  } else if (isSFlatA && !isSFlatB) {
    for (var i = 0; i < A.separatingAxes.length; i+=3) {
      N0[0] = A.separatingAxes[i+0]
      N0[1] = A.separatingAxes[i+1]
      N0[2] = A.separatingAxes[i+2]
      for (var j = 0; j < B.separatingAxes.length; j++) {
        cross(tmpv0,N0,B.separatingAxes[j])
        if (length(tmpv0) <= epsilon) continue
        if (!check(out, A, B, tmpv0)) return null
      }
    }
  } else if (!isSFlatA && isSFlatB) {
    for (var i = 0; i < A.separatingAxes.length; i++) {
      for (var j = 0; j < B.separatingAxes.length; j+=3) {
        N1[0] = B.separatingAxes[j+0]
        N1[1] = B.separatingAxes[j+1]
        N1[2] = B.separatingAxes[j+2]
        cross(tmpv0,A.separatingAxes[i],N1)
        if (length(tmpv0) <= epsilon) continue
        if (!check(out, A, B, tmpv0)) return null
      }
    }
  } else if (!isSFlatA && !isSFlatB) {
    for (var i = 0; i < A.separatingAxes.length; i++) {
      for (var j = 0; j < B.separatingAxes.length; j++) {
        cross(tmpv0,A.separatingAxes[i],B.separatingAxes[j])
        if (length(tmpv0) <= epsilon) continue
        if (!check(out, A, B, tmpv0)) return null
      }
    }
  }
  return out
}

function check (out, A, B, N) {
  var min0 = +Infinity, max0 = -Infinity
  var min1 = +Infinity, max1 = -Infinity
  if (isPFlatA) {
    for (var j = 0; j < A.positions.length; j+=3) {
      P[0] = A.positions[j+0]
      P[1] = A.positions[j+1]
      P[2] = A.positions[j+2]
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
    for (var j = 0; j < B.positions.length; j+=3) {
      P[0] = B.positions[j+0]
      P[1] = B.positions[j+1]
      P[2] = B.positions[j+2]
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
    out[2] = N[2] * overlap
  }
  return true
}
