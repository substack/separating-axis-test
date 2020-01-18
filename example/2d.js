var sat2d = require('../2d')
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
