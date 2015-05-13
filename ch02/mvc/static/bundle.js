(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var PinView = Backbone.View.extend({

  events: {
    'click': 'changeState'
  },

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

document.addEventListener('DOMContentLoaded', function () {

  var led = new PinView({el: '#schematic', model: ledModel });
  led.render();

  var status = new StatusView({el: '.status', model: ledModel });
  status.render();

});


},{}]},{},[1]);
