var sat2d = require('../2d.js')
var test = require('tape')

test('mix axis-aligned boxes 2d', function (t) {
  t.deepEqual(sat2d(
    [],
    {
      separatingAxes:[0,1,1,0],
      positions: [[0,1],[1,1],[1,0],[0,0]]
    },
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [-0.6,0.5,0.4,0.5,0.4,-0.5,-0.6,-0.5]
    }
  ), [0.4,0.0])
  t.deepEqual(sat2d(
    [],
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [0,1,1,1,1,0,0,0]
    },
    {
      separatingAxes:[0,1,1,0],
      positions: [[-0.5,0.4],[0.5,0.4],[0.5,-0.6],[-0.5,-0.6]]
    }
  ), [0.0,0.4])
  t.deepEqual(sat2d(
    [],
    {
      separatingAxes:[0,1,1,0],
      positions: [[0,1],[1,1],[1,0],[0,0]]
    },
    {
      separatingAxes:[0,1,1,0],
      positions: [[-0.5,1.5],[0.5,1.5],[0.5,0.5],[-0.5,0.5]]
    }
  ), [0.5,0.0])
  t.notOk(sat2d(
    [],
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [0,1,1,1,1,0,0,0]
    },
    {
      separatingAxes:[0,1,1,0],
      positions: [-0.5,-0.5,0.5,-0.5,0.5,-1.5,-0.5,-1.5]
    }
  ))
  t.end()
})
