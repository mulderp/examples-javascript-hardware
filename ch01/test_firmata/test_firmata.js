
// The Firmata protocol provides a simple protocol to an embedded system
var firmata = require('firmata');

// Change this line to the serial port of a device
var modem = '/dev/cu.usbmodem14231';

// Main part
var board = new firmata.Board(modem, function(err){
  console.log('connected:  ' +  modem);
  var ledOn = true;

  // Configure pin 13 as output
  board.pinMode(13, board.MODES.OUTPUT);


  // Blink the LED
  setInterval(function() {

    if (ledOn) {
      console.log('ON');
      board.digitalWrite(13, board.HIGH);
    } else {
      console.log('OFF);
      board.digitalWrite(13, board.LOW);
    }

    ledOn = !ledOn;

  }, 500);
}); 

