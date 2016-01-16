/* global TrelloPowerUp */

var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';

var getBadges = function(t, includeTitle){
  return t.card('name')
  .get('name')
  .then(function(cardName){
    var badgeColor;
    var icon = GRAY_ICON;
    var lowercaseName = cardName.toLowerCase();
    if(lowercaseName.indexOf('green') > -1){
      badgeColor = 'green';
      icon = WHITE_ICON;
    } else if(lowercaseName.indexOf('yellow') > -1){
      badgeColor = 'yellow';
      icon = WHITE_ICON;
    } else if(lowercaseName.indexOf('red') > -1){
      badgeColor = 'red';
      icon = WHITE_ICON;
    }
    
    if(lowercaseName.indexOf('dynamic') > -1){
      return [{
        dynamic: function(){
          return {
            title: includeTitle ? 'Detail Badge' : null,
            text: 'Dynamic ' + (Math.random() * 100).toFixed(0).toString(),
            icon: icon,
            color: badgeColor,
            refresh: 10
          }
        }
      }]
    }
    
    return [{
      title: includeTitle ? 'Detail Badge' : null,
      text: 'Static',
      icon: icon,
      color: badgeColor
    }];
  })
};

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
    return getBadges(t, false);
  },
  'card-buttons': function(t, options) {
    return [];
  },
  'card-detail-badges': function(t, options) {
    // same as card-badges, except you also return a title for the badge
    return getBadges(t, true);
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
