/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

// want to know when you are being closed?
window.addEventListener('unload', function(e) {
  // Our board bar is being closed, clean up if we need to
});

window.procMgtSection.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('card', 'shared', 'procMgtSection', window.procMgtSectionName.value)
  .then(function(){
    t.closePopup();
  });
});

t.render(function(){
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
  t.sizeTo('#procMgtSection').done();
});
