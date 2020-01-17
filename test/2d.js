var sat2d = require('../2d.js')
var test = require('tape')

test('axis-aligned boxes 2d', function (t) {
  t.deepEqual(sat2d(
    [],
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[0,1],[1,1],[1,0],[0,0]]
    },
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[-0.6,0.5],[0.4,0.5],[0.4,-0.5],[-0.6,-0.5]]
    }
  ), [0.4,0.0])
  t.deepEqual(sat2d(
    [],
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[0,1],[1,1],[1,0],[0,0]]
    },
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[-0.5,0.4],[0.5,0.4],[0.5,-0.6],[-0.5,-0.6]]
    }
  ), [0.0,0.4])
  t.deepEqual(sat2d(
    [],
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[0,1],[1,1],[1,0],[0,0]]
    },
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[-0.5,1.5],[0.5,1.5],[0.5,0.5],[-0.5,0.5]]
    }
  ), [0.5,0.0])
  t.notOk(sat2d(
    [],
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

test('oriented boxes 2d', function (t) {
  var sq2 = Math.sqrt(2)
  t.deepEqual(roundv2(1000,sat2d(
    [],
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[0,1],[1,1],[1,0],[0,0]]
    },
    {
      separatingAxes:[[sq2/2,sq2/2],[-sq2/2,sq2/2]],
      positions: [[-0.3,0.5],[+0.2,0.0],[-0.3,-0.5],[-0.8,0.0]]
    }
  )),[0.1,0.1])
  t.notOk(sat2d(
    [],
    {
      separatingAxes:[[0,1],[1,0]],
      positions: [[0,1],[1,1],[1,0],[0,0]]
    },
    {
      separatingAxes:[[sq2/2,sq2/2],[-sq2/2,sq2/2]],
      positions: [[-0.3,0.25],[+0.2,-0.25],[-0.3,-0.75],[-0.8,-0.25]]
    }
  ))
  t.end()
})

function roundv2 (n, v) {
  v[0] = Math.round(v[0]*n)/n
  v[1] = Math.round(v[1]*n)/n
  return v
}
