var fs = require('fs');
var http = require('http');
var finalhandler = require('finalhandler');
var morgan = require('morgan');

var Router = require('router');
var router = Router();

// add serial port
var firmata = require('firmata');
var modem = '/dev/cu.usbmodem14141';

var port = 3474;
console.log('Starting server at port: ' + port);

var latestData = 0;

// logging
router.use(morgan('default'));

router.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync('static/index.html'));
});
router.get('/bundle.js', function(req,res) {
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.end(fs.readFileSync('static/bundle.js'));
});
router.get('/pinout.png', function(req,res) {
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(fs.readFileSync('static/pinout.png'));
});

var api = Router();
api.post('/:name/:state', function(req, res) {
  console.log(req.params.name);
  console.log(req.params.state);
  board.digitalWrite(req.params.name, req.params.state == 'ON' ? board.HIGH : board.LOW);
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('ok');
});
router.use('/api', api);

var board = new firmata.Board(modem, function(err){
  console.log('connected: ' + modem);
  board.pinMode(13, board.MODES.OUTPUT);
  board.pinMode(12, board.MODES.OUTPUT);
  board.pinMode(11, board.MODES.OUTPUT);
  board.pinMode(10, board.MODES.OUTPUT);
  board.pinMode(9, board.MODES.OUTPUT);
  board.pinMode(8, board.MODES.OUTPUT);
  board.pinMode(7, board.MODES.OUTPUT);
  board.pinMode(6, board.MODES.OUTPUT);
  board.pinMode(5, board.MODES.OUTPUT);
  board.pinMode(4, board.MODES.OUTPUT);
  board.pinMode(3, board.MODES.OUTPUT);
  board.pinMode(2, board.MODES.OUTPUT);

  http.createServer(function (req, res) {
    router(req, res, finalhandler(req, res));
  }).listen(port);
});
