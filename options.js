var KEYBOARD_NAVIGATION_KEY = 'keyboard-navigation';
var NOTIFICATIONS_KEY = 'notifications';
var REFRESH_INTERVAL_KEY = 'refresh-interval';
var RELOADCENTER_INTERVAL_KEY = 'reloadcenter-interval';
var CLOSENOTIFICATION_INTERVAL_KEY = 'closenotification-interval';
var PREVIOUS_TOPICS_KEY = 'prev_topics';
var NEW_TOPICS_KEY = 'new_topics';
var NETWORK_CONNECTIONS_KEY = 'network_connections';
var NETWORK_CONNECTIONS_UPDATE_KEY = 'network_connections_update';
var NETWORK_CONNECTIONS_PREV_ONLINE_KEY = 'network_connections_prev_online';
var CHAT_START_MSG = 'chat_start';
var CHAT_PREV_MESSAGES_KEY = 'chat_prev_messages';
var CHAT_SHOW_CONVERSATION_MSG = 'chat_show_conversation';

function getCoconutUrl() {
  var url = "https://coconut.ogd.nl/";
  return url;
}

function getKeyboardNavigation() {
  if (!localStorage[KEYBOARD_NAVIGATION_KEY])
    return true;
  return localStorage[KEYBOARD_NAVIGATION_KEY] == "true";
}

function setKeyboardNavigation(value) {
  localStorage[KEYBOARD_NAVIGATION_KEY] = value;
}

function getNotifications() {
  if (!localStorage[NOTIFICATIONS_KEY])
    return true;
  return localStorage[NOTIFICATIONS_KEY] == "true";
}

function setNotifications(value) {
  localStorage[NOTIFICATIONS_KEY] = value;
}

function getRefreshInterval() {
  return parseInt(localStorage[REFRESH_INTERVAL_KEY] || '60000', 10);
}

function setRefreshInterval(value) {
  localStorage[REFRESH_INTERVAL_KEY] = value;
}

function getReloadCenterInterval() {
  return parseInt(localStorage[RELOADCENTER_INTERVAL_KEY] || '300000', 10);
}

function setReloadCenterInterval(value) {
  localStorage[RELOADCENTER_INTERVAL_KEY] = value;
}

function getCloseNotificationInterval() {
  return parseInt(localStorage[CLOSENOTIFICATION_INTERVAL_KEY] || '0', 10);
}

function setCloseNotificationInterval(value) {
  localStorage[CLOSENOTIFICATION_INTERVAL_KEY] = value;
}