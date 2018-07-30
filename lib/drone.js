const sumo = require('node-sumo')
// const keypress  = require('keypress')

const drone = sumo.createClient()


const keypress = require('keypress');

const stdin = process.stdin
// make `process.stdin` begin emitting "keypress" events
keypress(stdin);


// without this, we would only get streams once enter is pressed
stdin.setRawMode(true);

stdin.resume();

stdin.setRawMode( true )

// i don't want binary, do you?
stdin.setEncoding( 'utf8' )

// on any data into stdin
stdin.on( 'data', function( key ){
    // ctrl-c ( end of text )
    if ( key === '\u0003' ) {
        process.exit()
    }
    // write the key to stdout all normal like
    process.stdout.write( key )
})

let isMoving = false
let isGoingForward = false
let isTurning = false

const moveHandlers = {
  stop () {
    drone.stop()
    isMoving = false
    isTurning = false
  },
  up (speed) {
    this.forward(speed)
  },
  forward (speed) {
    if (!isTurning) {
      if (isMoving && isGoingForward) {
        return
      }
      if (isMoving) {
        drone.stop()
        console.log('Stopping')
        isMoving = false
        return
      }
    }
    drone.forward(speed)
    console.log('Going forward')
    isTurning = false
    isMoving = true
    isGoingForward = true
  },
  down (speed) {
    this.backward(speed)
  },
  backward (speed) {
    if (!isTurning) {
      if (isMoving && !isGoingForward) {
        return
      }
      if (isMoving) {
        drone.stop()
        console.log('Stopping')
        isMoving = false
        isGoingForward = false
        return
      }
    }
    drone.backward(speed)
    console.log('Going backward')
    isTurning = false
    isMoving = true
    isGoingForward = false
  },
  right (speed) {
    drone.right(speed)
    isTurning = true
    console.log('Turning right')
  },
  left (speed) {
    drone.left(speed)
    isTurning = true
    console.log('Turning left')
  },
}

// listen for the "keypress" event
stdin.on('keypress', function (ch, key) {
  const speed = key.shift ? 80 : 40
  moveHandlers[key.name](speed)
});

drone.connect(function() {
  drone.postureJumper()
})

module.exports = moveHandlers
