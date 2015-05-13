
// The view represents the graphics that are visible to a user
var PinView = Backbone.View.extend({

  events: {
    'click': 'changeState'
  },

  // renderin a pin means creating an SVG rectangle with a color
  render: function() {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute('x', 14);
    rect.setAttribute('y', 14);
    rect.setAttribute('width',  30);
    rect.setAttribute('height', 40);
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

// This view shows that status of a pin
var StatusView = Backbone.View.extend({

  render: function() {
    this.$el.html('LED is ' + this.model.getStatus());
  },

  initialize: function() {
    this.listenTo(this.model, 'change:state', this.render);
  }

});

// The model "remembers" the state of the pin
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

document.addEventListener('DOMContentLoaded', function () {

  var led = new PinView({el: '#schematic', model: ledModel });
  led.render();

  var status = new StatusView({el: '.status', model: ledModel });
  status.render();

});

