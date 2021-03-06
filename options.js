/**
 * Array for storing update interval.
 */
var UPDATE_INTERVAL_MINUTES = [1, 5, 10, 15, 30];
var UPDATE_INTERVAL_SECONDS = [1, 5, 10, 15, 30];

function saveCheck(formNode, option, id) {
  var optCheckNode = formNode[id+'-check'];
  var opt = optCheckNode.checked;
  setBoolOption(option, opt);
}

// Saves options to localStorage.
function saveOptions() {
  var formNode = document.getElementById('options-form');

  var keyboardNavigationCheckNode = formNode['keyboard-navigation-check'];
  var keyboardNavigationCheck = keyboardNavigationCheckNode.checked;
  setKeyboardNavigation(keyboardNavigationCheck);

  var notificationsCheckNode = formNode['notifications-check'];
  var notificationsCheck = notificationsCheckNode.checked;
  setNotifications(notificationsCheck);

  saveCheck(formNode, FORUM_NEW_TOPIC_NOTIFICATION_KEY, 'forum-new-topic-notification');
  saveCheck(formNode, NETWORK_CONNECTIONS_ONLINE_NOTIFICATION_KEY, 'network-connections-online-notification');
  saveCheck(formNode, NETWORK_CONNECTIONS_OFFLINE_NOTIFICATION_KEY, 'network-connections-offline-notification');
  saveCheck(formNode, CHAT_NEW_MESSAGE_NOTIFICATION_KEY, 'chat-new-message-notification');

  var refreshIntervalNode = formNode['refresh-interval'];
  var refreshInterval =
      refreshIntervalNode.children[refreshIntervalNode.selectedIndex].value;
  setRefreshInterval(refreshInterval);

  var reloadcenterIntervalNode = formNode['reloadcenter-interval'];
  var reloadcenterInterval =
      reloadcenterIntervalNode.children[reloadcenterIntervalNode.selectedIndex].value;
  setReloadCenterInterval(reloadcenterInterval);

  var closenotificationIntervalNode = formNode['closenotification-interval'];
  var closenotificationInterval =
      closenotificationIntervalNode.children[closenotificationIntervalNode.selectedIndex].value;
  setCloseNotificationInterval(closenotificationInterval);

  // Update status to let user know options were saved.
  var buttonNode = $('save-button');
  buttonNode.innerHTML = chrome.i18n.getMessage('savedMessage');
  buttonNode.disabled = true;
  setTimeout(function() {
    buttonNode.innerHTML = chrome.i18n.getMessage('saveButton');
    buttonNode.disabled = false;
  }, 750);
}

function restoreCheck(formNode, optname, optid) {
  var opt = getBoolOption(optname);
  var optCheckNode = formNode[optid+'-check'];
  optCheckNode.checked = opt;
}

function restoreOptions() {
  var formNode = document.getElementById('options-form');

  var keyboardNavigation = getKeyboardNavigation();
  var keyboardNavigationCheckNode = formNode['keyboard-navigation-check'];
  keyboardNavigationCheckNode.checked = keyboardNavigation;

  var notifications = getNotifications();
  var notificationsCheckNode = formNode['notifications-check'];
  notificationsCheckNode.checked = notifications;

  restoreCheck(formNode, FORUM_NEW_TOPIC_NOTIFICATION_KEY, 'forum-new-topic-notification');
  restoreCheck(formNode, NETWORK_CONNECTIONS_ONLINE_NOTIFICATION_KEY, 'network-connections-online-notification');
  restoreCheck(formNode, NETWORK_CONNECTIONS_OFFLINE_NOTIFICATION_KEY, 'network-connections-offline-notification');
  restoreCheck(formNode, CHAT_NEW_MESSAGE_NOTIFICATION_KEY, 'chat-new-message-notification');

  var refreshInterval = getRefreshInterval();
  var refreshIntervalNode = formNode['refresh-interval'];
  for (var i = 0, refreshValueNode;
       refreshValueNode = refreshIntervalNode[i];
       i++) {
    if (refreshValueNode.value == refreshInterval) {
      refreshValueNode.selected = 'true';
      break;
    }
  }

  var reloadcenterInterval = getReloadCenterInterval();
  var reloadcenterIntervalNode = formNode['reloadcenter-interval'];
  for (var i = 0, reloadcenterValueNode;
       reloadcenterValueNode = reloadcenterIntervalNode[i];
       i++) {
    if (reloadcenterValueNode.value == reloadcenterInterval) {
      reloadcenterValueNode.selected = 'true';
      break;
    }
  }

  var closenotificationInterval = getCloseNotificationInterval();
  var closenotificationIntervalNode = formNode['closenotification-interval'];
  for (var i = 0, closenotificationValueNode;
       closenotificationValueNode = closenotificationIntervalNode[i];
       i++) {
    if (closenotificationValueNode.value == closenotificationInterval) {
      closenotificationValueNode.selected = 'true';
      break;
    }
  }
}

function initForm() {
  var formNode = document.getElementById('options-form');

  // For creating drop down menu dynamically on page load.
  var refreshIntervalNode = formNode['refresh-interval'];
  for (var i = 0, interval; interval = UPDATE_INTERVAL_MINUTES[i]; i++) {
    refreshIntervalNode.options[refreshIntervalNode.options.length] =
        new Option(interval.toString() + ' minute' + (interval != 1 ? 's' : '')/*chrome.i18n.getMessage('minutes', interval.toString())*/,
            interval * 60000);
  }

  var reloadcenterIntervalNode = formNode['reloadcenter-interval'];
  reloadcenterIntervalNode.options[reloadcenterIntervalNode.options.length] =
        new Option('disabled' /*chrome.i18n.getMessage('minutes', interval.toString())*/,
            0);
  for (var i = 0, interval; interval = UPDATE_INTERVAL_MINUTES[i]; i++) {
    reloadcenterIntervalNode.options[reloadcenterIntervalNode.options.length] =
        new Option(interval.toString() + ' minute' + (interval != 1 ? 's' : '')/*chrome.i18n.getMessage('minutes', interval.toString())*/,
            interval * 60000);
  }

  var closenotificationIntervalNode = formNode['closenotification-interval'];
  closenotificationIntervalNode.options[closenotificationIntervalNode.options.length] =
        new Option('disabled' /*chrome.i18n.getMessage('seconds', interval.toString())*/,
            0);
  for (var i = 0, interval; interval = UPDATE_INTERVAL_SECONDS[i]; i++) {
    closenotificationIntervalNode.options[closenotificationIntervalNode.options.length] =
        new Option(interval.toString() + ' second' + (interval != 1 ? 's' : '')/*chrome.i18n.getMessage('seconds', interval.toString())*/,
            interval * 1000);
  }

  // Call to messages.json for implementing i18n.
  if (chrome.i18n.getMessage('direction') == 'rtl') {
    document.querySelector('body').style.direction = 'rtl';
  }

  document.getElementsByTagName('title').innerHTML =
      'Coconut Chrome Extension Options'; //chrome.i18n.getMessage('title');
  document.getElementById('options-header').innerHTML = 'Options for Coconut Chrome Extension'; // chrome.i18n.getMessage('title');
  document.getElementById('show-keyboard-navigation').innerHTML = 'Keyboard navigation enabled'; // chrome.i18n.getMessage('keyboardNavigation');
  document.getElementById('show-notifications').innerHTML = 'Notifications enabled'; // chrome.i18n.getMessage('showModule');
  document.getElementById('show-forum-new-topic-notification').innerHTML = 'Show new forum topic notification enabled';
  document.getElementById('show-network-connections-online-notification').innerHTML = 'Show online network connections notification enabled';
  document.getElementById('show-network-connections-offline-notification').innerHTML = 'Show offline network connections notification enabled';
  document.getElementById('show-chat-new-message-notification').innerHTML = 'Show new chat message notification enabled';
  document.getElementById('interval-text').innerHTML = 'Interval for update'; // chrome.i18n.getMessage('intervalText');
  document.getElementById('reloadcenter-text').innerHTML = 'Interval for reload center'; // chrome.i18n.getMessage('reloadcenterText');
  document.getElementById('closenotification-text').innerHTML = 'Interval for close desktop notification'; // chrome.i18n.getMessage('closenotificationText');
  document.getElementById('save-button').innerHTML = 'Save'; // chrome.i18n.getMessage('saveButton');
}

function init() {
  initForm();
  restoreOptions();
}

document.addEventListener('DOMContentLoaded', function () {
  init();
  document.getElementById('save-button').addEventListener('click', saveOptions);
});