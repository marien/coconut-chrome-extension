function isCoconutUrl(url) {
  var coconut = getCoconutUrl();
  if (url.indexOf(coconut) != 0)
    return false;

  return url;
}

function goToCoconut() {
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isCoconutUrl(tab.url)) {
        chrome.tabs.update(tab.id, {selected: true});
        return;
      }
    }
    chrome.tabs.create({url: getCoconutUrl()});
  });
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	goToCoconut();
});

function init() {
  // start forum unread loop
  getForumUnreadCount();
  // clear previous online cache
  if (localStorage[NETWORK_CONNECTIONS_PREV_ONLINE_KEY] != undefined)
    localStorage.removeItem(NETWORK_CONNECTIONS_PREV_ONLINE_KEY);
  // start chat status loop
  getChatStatus();
}

// listener for get getoption events
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.getOption == KEYBOARD_NAVIGATION_KEY)
            sendResponse({KEYBOARD_NAVIGATION_KEY: getKeyboardNavigation()});
        if (request.getOption == RELOADCENTER_INTERVAL_KEY)
            sendResponse({RELOADCENTER_INTERVAL_KEY: getReloadCenterInterval()});
});

document.addEventListener('DOMContentLoaded', function () {
  init();
});