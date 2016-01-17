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
    
    if(lowercaseName.indexOf('static') > -1){
      // return an array of badge objects
      return [{
        title: includeTitle ? 'Detail Badge' : null,
        text: 'Static',
        icon: icon,
        color: badgeColor
      }];
    } else {
      return [];
    }
  })
};

var formatNPSUrl = function(t, url){
  if(!/^https?:\/\/www\.nps\.gov\/[a-z]{4}\//.test(url)){
    return null;
  }
  
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
    return parkMap[parkShort];
  } else{
    return null;
  }
};

TrelloPowerUp.initialize({
  'attachment-sections': function(t, options){
    return [];
  },
  'attachment-thumbnail': function(t, options){
    var parkName = formatNPSUrl(t, options.url);
    if(parkName){
      return {
        url: options.url,
        title: parkName,
        image: {
          url: './images/nps.svg',
          logo: true
        },
        openText: 'Open in NPS'
      };
    } else {
      throw t.NotHandled();
    }
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
    var parkName = formatNPSUrl(t, options.url);
    if(parkName){
      return {
        name: parkName,
        desc: 'An awesome park: ' + options.url
      };
    } else {
      throw t.NotHandled();
    }
  },
  'format-url': function(t, options) {
    var parkName = formatNPSUrl(t, options.url);
    if(parkName){
      return {
        icon: GRAY_ICON,
        text: parkName
      };
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
