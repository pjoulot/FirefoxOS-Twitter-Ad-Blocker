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
    var timeline = document.querySelector('.timeline');
    timeline.classList.add('twitter-adblock-injected');
    removePromotedTweets();
    //Remove ads when we load more tweets
    var listenMoreTweets = document.querySelector('#view-tweets');
    listenMoreTweets.addEventListener('DOMSubtreeModified', function() {
      removePromotedTweets();
    });
  }
}

function removePromotedTweets() {
  var elementsToRemove = document.querySelectorAll('.timeline .stream-items[type="tweets"] li[label="promoted"]');
  var i;
  for (i = 0; i < elementsToRemove.length; i++) {
    var parentItem = elementsToRemove[i].parentNode;
    parentItem.removeChild(elementsToRemove[i]);
  } 
}
