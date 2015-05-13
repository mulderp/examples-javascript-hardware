var display = require('../drawings/7_segment_labelled.svg')(0,0);

var SegmentViews = Backbone.View.extend({

  events: {
    'click': 'handleClick'
  },

  render: function() {
    this.$el.attr('style', this.model.getColor());
  },

  handleClick: function(e) {
    this.model.toggle();
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  }

});

var StatusView = Backbone.View.extend({

  render: function() {
    var tmpl = 'Segment: ' + this.a.get('name') + ' PIN:   ' + this.a.get('pin') + ' LED: ' + this.a.getState() + ' <br> ';
    tmpl += 'Segment: ' + this.b.get('name') + ' PIN:   ' + this.b.get('pin') + ' LED: ' + this.b.getState() + ' <br> ';
    tmpl += 'Segment: ' + this.c.get('name') + ' PIN:   ' + this.c.get('pin') + ' LED: ' + this.c.getState() + ' <br> ';
    tmpl += 'Segment: ' + this.d.get('name') + ' PIN:   ' + this.d.get('pin') + ' LED: ' + this.d.getState() + ' <br> ';
    tmpl += 'Segment: ' + this.e.get('name') + ' PIN:   ' + this.e.get('pin') + ' LED: ' + this.e.getState() + ' <br> ';
    tmpl += 'Segment: ' + this.f.get('name') + ' PIN:   ' + this.f.get('pin') + ' LED: ' + this.f.getState() + ' <br> ';
    tmpl += 'Segment: ' + this.g.get('name') + ' PIN:   ' + this.g.get('pin') + ' LED: ' + this.g.getState() + ' <br> ';

    this.$el.html(tmpl);
  },

  initialize: function(options) {
    this.a = options.a;
    this.b = options.b;
    this.c = options.c;
    this.d = options.d;
    this.e = options.e;
    this.f = options.f;
    this.g = options.g;

    this.listenTo(this.a, 'change', this.render);
    this.listenTo(this.b, 'change', this.render);
    this.listenTo(this.c, 'change', this.render);
    this.listenTo(this.d, 'change', this.render);
    this.listenTo(this.e, 'change', this.render);
    this.listenTo(this.f, 'change', this.render);
    this.listenTo(this.g, 'change', this.render);
  }


});


var SegmentModel = Backbone.Model.extend({

  url: function() {
    return '/api/' + this.get('pin') + '/' + this.getState();
  },

  getColor: function() {
    return (this.get('active') ? 'fill:red' : 'fill: #DDDDDD');
  },

  toggle: function() {
    var active = this.get('active');
    this.set('active', !active);
    this.save();
  },

  getState: function() {
    return this.get('active') ? 'ON' : 'OFF';
  }

});


var a = new SegmentModel({name: 'a', pin: 12, active: 0}); 
var b = new SegmentModel({name: 'b', pin: 11, active: 0}); 
var c = new SegmentModel({name: 'c', pin: 3, active: 0}); 
var d = new SegmentModel({name: 'd', pin: 8, active: 0}); 
var e = new SegmentModel({name: 'e', pin: 2, active: 0}); 
var f = new SegmentModel({name: 'f', pin: 9, active: 0}); 
var g = new SegmentModel({name: 'g', pin: 7, active: 0}); 


$(document).ready(function() {

  $('svg').append(display);
  var segmentView_a = new SegmentViews({model: a, el: '#a'});
  var segmentView_b = new SegmentViews({model: b, el: '#b'});
  var segmentView_c = new SegmentViews({model: c, el: '#c'});
  var segmentView_d = new SegmentViews({model: d, el: '#d'});
  var segmentView_e = new SegmentViews({model: e, el: '#e'});
  var segmentView_f = new SegmentViews({model: f, el: '#f'});
  var segmentView_g = new SegmentViews({model: g, el: '#g'});

  var statusView = new StatusView({el: '.status', a: a, b: b, c: c, d: d, e: e, f: f, g: g });
  statusView.render();

});
