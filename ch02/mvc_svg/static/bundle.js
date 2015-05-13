(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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


},{"../drawings/led_blink.svg":2}],2:[function(require,module,exports){
function format(text) {return function(x, y) {x = (+x|0);y = (+y|0);var el = document.createElement("div");el.innerHTML = "<svg><g><g>" + text + "</g></g></svg>";el = el.childNodes[0].childNodes[0];el.childNodes[0].setAttribute("transform", "translate(" + x + "," + y + ")");return el}}
module.exports = format("\n  <g id=\"Layer_1\">\n    <path d=\"M37.167,42.5 L91.641,42.5\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path7119\"/>\n    <path d=\"M91.641,30.5 L91.641,54.5\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path7994\"/>\n    <path d=\"M91.641,30.5 L111.641,42.5\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path7996\"/>\n    <path d=\"M91.641,54.5 L111.641,42.5\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path7998\"/>\n    <path d=\"M111.641,30.5 L111.641,54.5\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path8000\"/>\n    <path d=\"M111.641,42.5 L190.833,42.5\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path8002\"/>\n    <path d=\"M111.641,22.5 L106.641,32.5\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path1323\"/>\n    <path d=\"M104.641,19.5 L99.641,29.5\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path1325\"/>\n    <path d=\"M111.641,22.5 L112.641,25.5\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path1331\"/>\n    <path d=\"M111.641,22.5 L108.641,23.5\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path1333\"/>\n    <path d=\"M104.641,19.5 L105.641,22.5\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path1335\"/>\n    <path d=\"M104.641,19.5 L101.641,20.5\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path1337\"/>\n    <text transform=\"matrix(1, 0, 0, 1, 69.318, 32.379)\" id=\"tspan8006\">\n      <tspan x=\"-12.945\" y=\"2.5\" font-family=\".LucidaGrandeUI\" font-size=\"8\" fill=\"#000000\">Anode</tspan>\n    </text>\n    <text transform=\"matrix(1, 0, 0, 1, 140.346, 34.379)\" id=\"tspan8010\">\n      <tspan x=\"-16.654\" y=\"2.5\" font-family=\".LucidaGrandeUI\" font-size=\"8\" fill=\"#000000\">Cathode</tspan>\n    </text>\n    <path d=\"M190.833,42.5 L190.833,122.167\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" id=\"path8000\"/>\n    <g>\n      <path d=\"M184.333,54.712 L197.333,54.712 L197.333,95.5 L184.333,95.5 L184.333,54.712 z\" fill=\"#FFFFFF\"/>\n      <path d=\"M184.333,54.712 L197.333,54.712 L197.333,95.5 L184.333,95.5 L184.333,54.712 z\" fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"1\"/>\n    </g>\n    <path d=\"M200.746,118.667 L190.333,136.701 L179.921,118.667 z\" fill=\"#000000\"/>\n  </g>\n")
},{}]},{},[1]);
