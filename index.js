var sumo = require('node-sumo');

var drone = sumo.createClient();

drone.connect(function() {
  drone.postureJumper();
  drone.forward(50);

  setTimeout(function() {
    drone.stop();
  }, 1000);
});