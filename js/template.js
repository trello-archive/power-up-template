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
      // dyanmic badges can have their function rerun after a set number
      // of seconds defined by refresh. Minimum of 10 seconds.
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
    
    // return an array of badge objects
    return [{
      title: includeTitle ? 'Detail Badge' : null,
      text: 'Static',
      icon: icon,
      color: badgeColor
    }];
  })
};

var formatNPSUrl = function(t, url){
  var parkMap = {
    arch: 'Arches National Park',
    brca: 'Bryce Canyon National Park',
    crla: 'Crater Lake National Park',
    dena: 'Denali National Park',
    glac: 'Glacier National Park',
    grca: 'Grand Canyon National Park',
    olym: 'Olympic National Park',
    yell: 'Yellowstone National Park',
    yose: 'Yosemite National Park'
  };
  var parkShort = /^https?:\/\/www\.nps\.gov\/([a-z]{4})\//.exec(url)[1];
  if(parkShort && parkMap[parkShort]){
    return {
      icon: GRAY_ICON,
      text: parkMap[parkShort]
    };
  } else{
    throw t.NotHandled();
  }
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
    // we check to see if the url is a National Park Service url
    if(/^https?:\/\/www\.nps\.gov\/[a-z]{4}\//.test(options.url)){
      // we will return the park name for the url if we know it
      return formatNPSUrl(t, options.url);
    } else {
      throw t.NotHandled();
    }
  },
  'show-settings': function(t, options){
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 184
    });
  }
});
