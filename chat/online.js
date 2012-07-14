function init() {
    var id = $.url().param('user');
    var users = JSON.parse(localStorage[NETWORK_CONNECTIONS_KEY]);
    var user = users[id];
    showUser(user);
    
    jQuery('div.user').bind('click', user, startChat);
}

function showUser(user) {
    var url = user.img;
    if (url.indexOf('http') != 0) {
        url = getCoconutUrl() + url;
    }
    jQuery('div.userImage > img').attr('src',url);
    jQuery('div.userMessage').text(user.name + ' is online');
}

function startChat(event) {
    chrome.extension.sendRequest({command: CHAT_START_MSG, data: JSON.stringify(event.data)});
    close();
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});