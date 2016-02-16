// If injecting into an app that was already running at the time
// the app was enabled, simply initialize it.
if (document.documentElement) {
  initialize();
}

// Otherwise, we need to wait for the DOM to be ready before
// starting initialization since add-ons are injected
// *before* `document.documentElement` is defined.
else {
  window.addEventListener('DOMContentLoaded', initialize);
}

function initialize() {
  if (document.querySelector('.twitter-adblock-injected')) {
    // Already injected, abort.
    return;
  } else {
    var listenMoreTweets = document.querySelector('#views');
    listenMoreTweets.classList.add('twitter-adblock-injected');
    removePromotedTweetsAndAccounts();
    removePromotedTrendBoxItem();
    // Remove ads when there are changes into the views container
    // It was before done on the view itself has already a listener
    //and for some reasons the listener was removed sometimes
    
    listenMoreTweets.addEventListener('DOMSubtreeModified', function() {
      removePromotedTweetsAndAccounts();
      removePromotedTrendBoxItem();
    });
  }
}

function removePromotedTweetsAndAccounts() {
  //Use a large selector to remove sponsorised tweets but also Twitter sponsorised accounts
  var elementsToRemove = document.querySelectorAll('[label="promoted"]');
  var i;
  for (i = 0; i < elementsToRemove.length; i++) {
    var parentItem = elementsToRemove[i].parentNode;
    parentItem.removeChild(elementsToRemove[i]);
  } 
}

function removePromotedTrendBoxItem() {
  var elementsToRemove = document.querySelectorAll('#view-discover .trends-box-list-item .promoted-content');
  var i;
  for (i = 0; i < elementsToRemove.length; i++) {
    var item = elementsToRemove[i].parentNode;
    var parentItem = item.parentNode;
    parentItem.removeChild(item);
  }
}
