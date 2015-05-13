
var schematicSVG = require('../drawings/led_blink.svg')(0,0);

var PinView = Backbone.View.extend({

  events: {
    'click': 'changeState'
  },

  render: function() {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute('x', 14);
    rect.setAttribute('y', 24);
    rect.setAttribute('width',  26);
    rect.setAttribute('height', 26);
    rect.setAttribute('style', 'fill:' + this.model.getColor() + ';stroke:pink');
    this.$el.html(rect);
  },

  changeState: function(e) {
    this.model.toggleState();
  },

  initialize: function() {
    this.listenTo(this.model, 'change:state', this.render);
  }

});

var StatusView = Backbone.View.extend({

  render: function() {
    this.$el.html('LED is ' + this.model.getStatus());
  },

  initialize: function() {
    this.listenTo(this.model, 'change:state', this.render);
  }

});

var LEDModel = Backbone.Model.extend({
  defaults: {
    state: 0
  },

  getColor: function() {
    return (this.get('state') ? 'red' : 'black');
  },

  toggleState: function() {
    var current = this.get('state');
    this.set('state', !current);
  },

  getStatus: function() {
    return (this.get('state') ? 'ON' : 'OFF');
  }

});
var ledModel = new LEDModel();

var svg = document.getElementsByTagName('svg')[0];
document.addEventListener('DOMContentLoaded', function () {

  svg.appendChild(schematicSVG);

  var led = new PinView({el: '#pins', model: ledModel});
  led.render();

  var status = new StatusView({el: '.status', model: ledModel});
  status.render();

});

