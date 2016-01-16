/* global TrelloPowerUp */

var getBadges = function(t, includeTitle){
  return t.card('name')
  .get('name')
  .then(function(cardName){
    var badgeColor;
    var lowercaseName = cardName.toLowerCase();
    if(lowercaseName.indexOf('green') > -1){
      badgeColor = 'green';
    } else if(lowercaseName.indexOf('yellow') > -1){
      badgeColor = 'yellow';
    } else if(lowercaseName.indexOf('red') > -1){
      badgeColor = 'red';
    }
    
    if(lowercaseName.indexOf('dynamic') > -1){
      return [{
        dynamic: function(){
          return {
            title: includeTitle ? 'Detail Badge' : null,
            text: 'Dynamic ' + (Math.random() * 10).toFixed(0).toString(),
            icon: './images/icon.svg',
            color: badgeColor,
            refresh: 30
          }
        }
      }]
    }
    
    return [{
      title: includeTitle ? 'Detail Badge' : null,
      text: 'Static',
      icon: './images/icon.svg',
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
