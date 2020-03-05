TrelloPowerUp.initialize({
  'card-buttons': function(t, options){
    return [{
      icon: 'https://shizhz.github.io/trello-octopus/images/logo.png',
      text: 'Create Proc Section',
      callback: function(t){
        return t.popup({
          title: "Proc Management Section",
          url: 'proc-mgt-popup.html'
        });
      }
    }];
  }
});
