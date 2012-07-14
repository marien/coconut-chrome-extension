function init() {
    var messageids = $.url().param('messages').split(',');
    var prev_messages = JSON.parse(localStorage[CHAT_PREV_MESSAGES_KEY]);
    var messages = [];
    jQuery(messageids).each(function() {
        var messageid = this;
        jQuery(prev_messages).each(function() {
            if (this.messageId == messageid) {
                messages.push(this);
                return;
            }
        });
    });
    showMessages(messages);
    
    jQuery('div.conversation').bind('click', messages[0].conversationId, showConversation);
}

function showMessages(messages) {
    var users = JSON.parse(localStorage[NETWORK_CONNECTIONS_KEY]);
    var user = users[messages[0].userId];
    var url = user.img;
    if (url.indexOf('http') != 0) {
        url = getCoconutUrl() + url;
    }
    jQuery('div.userImage > img').attr('src',url);
    jQuery('div.userMessage').text(user.name + ' says:');
    jQuery(messages).each(function() {
        jQuery('div.messages').append('<div class="message">' + this.message + '</div>');
    });
}

function showConversation(event) {
    chrome.extension.sendRequest({command: CHAT_SHOW_CONVERSATION_MSG, data: JSON.stringify(event.data)});
    close();
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});