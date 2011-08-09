function getChatStatus() {
    function showOnlineNotifications(online) {
        // loading initial set of online users (is done after every reload of background.html)
        if (localStorage[NETWORK_CONNECTIONS_PREV_ONLINE_KEY] == undefined) {
            localStorage[NETWORK_CONNECTIONS_PREV_ONLINE_KEY] = JSON.stringify(online);
            return;
        }
        var prev_online = JSON.parse(localStorage[NETWORK_CONNECTIONS_PREV_ONLINE_KEY]);
        var users = JSON.parse(localStorage[NETWORK_CONNECTIONS_KEY]);
        // parse list for new online users
        jQuery(online).each(function () {
            var found = false;
            var id = this.userId;
            jQuery.each(prev_online, function() {
                found = found || this.userId == id;
            });
            if (!found) {
                var user = users[id];
                if (user != undefined) {
                    var notification = webkitNotifications.createHTMLNotification('chat/online.html?user='+id);
                    notification.ondisplay = function() {
                        window.setTimeout(function(n){n.cancel();},10000,notification);
                    };
                    window.setTimeout(function(n){n.cancel();},60000,notification);
                    notification.show();
                }
            }
        });
        
        // parse list for new offline users
        jQuery(prev_online).each(function () {
            var found = false;
            var id = this.userId;
            jQuery.each(online, function() {
                found = found || this.userId == id;
            });
            if (!found) {
                var user = users[id];
                if (user != undefined) {
                    var url = user.img;
                    if (url.indexOf('http') != 0) {
                        url = getCoconutUrl() + url;
                    }
                    var notification = webkitNotifications.createNotification(
                        url,
                        user.name + ' is offline',
                        ''
                    );
                    notification.ondisplay = function() {
                        window.setTimeout(function(n){n.cancel();},10000,notification);
                    };
                    window.setTimeout(function(n){n.cancel();},60000,notification);
                    notification.show();
                }
            }
        });
        
        localStorage[NETWORK_CONNECTIONS_PREV_ONLINE_KEY] = JSON.stringify(online);
    }

    function showChatMessageNotifications(messages) {
        // loading initial set of messages (is done after every reload of background.html)
        if (localStorage[CHAT_PREV_MESSAGES_KEY] == undefined) {
            localStorage[CHAT_PREV_MESSAGES_KEY] = JSON.stringify(messages);
            return;
        }
        var prev_messages = JSON.parse(localStorage[CHAT_PREV_MESSAGES_KEY]);
        var users = JSON.parse(localStorage[NETWORK_CONNECTIONS_KEY]);
        var convs = {};
        // parse list for new messages and conversations
        jQuery(messages).each(function () {
            var found = false;
            // check if the message is from a known user
            var users = JSON.parse(localStorage[NETWORK_CONNECTIONS_KEY]);
            var user = users[this.userId];
            if (user != undefined) {
                var messageId = this.messageId;
                // check if message is new and from a known user
                jQuery.each(prev_messages, function() {
                    found = found || this.messageId == this.messageId;
                });
                if (!found) {
                    if (convs[this.conversationId] == undefined) {
                        convs[this.conversationId] = [this.messageId];
                    } else {
                        convs[this.conversationId].push(this.messageId);
                    }
                }
            }
        });
        // show a notification for each updated conversation
        jQuery.each(convs, function() {
            var notification = webkitNotifications.createHTMLNotification('chat/message.html?messages='+this);
            notification.ondisplay = function() {
                window.setTimeout(function(n){n.cancel();},10000,notification);
            };
            window.setTimeout(function(n){n.cancel();},60000,notification);
            notification.show();
        });
        localStorage[CHAT_PREV_MESSAGES_KEY] = JSON.stringify(messages);
    }

    jQuery.ajax({
        url: getCoconutUrl() + 'chat/messages.json?user_ids='+localStorage[NETWORK_CONNECTIONS_UPDATE_KEY],
        success: function (data) {
            if (data.onlineUsers != undefined)
            {
                if (getNotifications()) {
                    showOnlineNotifications(data.onlineUsers);
                    showChatMessageNotifications(data.chatMessages);
                }
            }
            window.setTimeout(getChatStatus, getRefreshInterval());
        },
        error: function (data) {
            window.setTimeout(getChatStatus, getRefreshInterval());
        }
    });
}
// listener for chat events
var startchat = [];
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.sendData == NETWORK_CONNECTIONS_KEY) {
            localStorage[NETWORK_CONNECTIONS_KEY] = request.data;
            var users = JSON.parse(request.data);
            var ids = [];
            for (id in users) {
              ids.push(id);
            }
            // send any remaining startchat requests
            localStorage[NETWORK_CONNECTIONS_UPDATE_KEY] = ids;
            while(startchat.length > 0) {
                var user = startchat.pop()
                sendResponse({command: CHAT_START_MSG, data: JSON.stringify(user)});
            }
        }
        // handle start chat requests
        if (request.command == CHAT_START_MSG) {
            var user = JSON.parse(request.data);
            // find tab running Coconut
            chrome.tabs.getAllInWindow(undefined, function(tabs) {
                // check if we already have users waiting
                if (startchat.length == 0) {
                    for (var i = 0, tab; tab = tabs[i]; i++) {
                      if (tab.url && isCoconutUrl(tab.url)) {
                        chrome.tabs.update(tab.id, {selected: true});
                        // send startchat request
                        chrome.tabs.sendRequest(tab.id, {command: CHAT_START_MSG, data: JSON.stringify(user)});
                        return;
                      }
                    }
                }
                // create new tab running coconut and store user
                chrome.tabs.create({url: getCoconutUrl()});
                startchat.push(user);
            });
        }
        // handle show conversation requests
        if (request.command == CHAT_SHOW_CONVERSATION_MSG) {
            goToCoconut();
        }
});