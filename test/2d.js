var sat2d = require('../2d.js')
var test = require('tape')

test('axis-aligned boxes 2d', function (t) {
  t.ok(sat2d(
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[0,1],[1,1],[1,0],[0,0]]
    },
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[-0.5,0.5],[0.5,0.5],[0.5,-0.5],[-0.5,-0.5]]
    }
  ))
  t.ok(sat2d(
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[0,1],[1,1],[1,0],[0,0]]
    },
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[-0.5,1.5],[0.5,1.5],[0.5,0.5],[-0.5,0.5]]
    }
  ))
  t.notOk(sat2d(
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[0,1],[1,1],[1,0],[0,0]]
    },
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[-0.5,-0.5],[0.5,-0.5],[0.5,-1.5],[-0.5,-1.5]]
    }
  ))
  t.end()
})
