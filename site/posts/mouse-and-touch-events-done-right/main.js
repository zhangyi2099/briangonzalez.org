
$.mte = {};
$.mte.touch

$.mte.startEvent = Modernizr.touch ? 'touchstart' : 'click';
$.mte.endEvent   = Modernizr.touch ? 'touchend' : 'mouseup';
$.mte.moveEvent  = Modernizr.touch ? 'touchmove' : 'mousemove';

// List w/ Fast Buttons
// ---------------
$.mte.fastList = Backbone.View.extend({
  el: 'ul.scrolling-button-list.fast',
  events: function(){
    events = {};
    events[ $.mte.startEvent + ' li' ] = 'activate';
    return events;
  },
  initialize: function(){
    this.$el.find('li').text('I activate on click or touchstart depending on the device. I actually activate on ' + $.mte.startEvent + '.')
  },
  activate: function(el){
    $(el.target).addClass('activated').text('ACTIVATED!');
  }
});

// List w/ Normal Buttons
// ---------------
$.mte.normalList = Backbone.View.extend({
  el: 'ul.scrolling-button-list.normal',
  events: function(){
    events = {};
    events[ 'click li' ] = 'activate';
    return events;
  },
  initialize: function(){
    this.$el.find('li').text('I activate only on click.')
  },
  activate: function(el){
    $(el.target).addClass('activated').text('ACTIVATED!');
  }
});

// Buttons - Cancelable / Not Cancelable
// ---------------
$.mte.buttons = Backbone.View.extend({
  el: '.cancelable-button-demo',
  events: function(){
    events = {};
    events[ 'click a.normal' ]                    = 'activate';
    events[ $.mte.startEvent + ' a.fast' ]    = 'activate';
    return events;
  },
  activate: function(ev){
    ev && ev.preventDefault();
    $(ev.target).addClass('activated').text('ACTIVATED!');
  }
});

// Document Ready

$(document).ready(function(){
  new $.mte.fastList();
  new $.mte.normalList();
  new $.mte.buttons();
});