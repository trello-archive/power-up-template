/* global TrelloPowerUp */

TrelloPowerUp.initialize({
  'attachment-sections': function(t, options){
    return [];
  },
  'attachment-thumbnail': function(t, options){
    throw t.NotHandled();
  },
  'board-buttons': function(t, options){
    return [];
  },
  'card-badges': function(t, options){
    return [];
  },
  'card-buttons': function(t, options) {
    return [];
  },
  'card-detail-badges': function(t, options) {
    return [];
  },
  'card-from-url': function(t, options) {
    throw t.NotHandled();
  },
  'format-url': function(t, options) {
    throw t.NotHandled();
  },
  'show-settings': function(t, options){
    throw t.NotHandled();
  }
});
