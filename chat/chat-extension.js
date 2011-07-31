jQuery(document).ready(function(){
    var users = {};
    jQuery(".friendsList .start_chat_session").each(function() {
        var user = {
            id: jQuery(this).find("input:hidden").val(),
            name: jQuery(this).find(".personalTopSummaryName").text(),
            img: jQuery(this).find("img").attr('src')
        };
        users[user.id] = user;
    });
    chrome.extension.sendRequest({sendData: NETWORK_CONNECTIONS_KEY, data: JSON.stringify(users)}, function(response) {
        var user = JSON.parse(response.data);
        startChat(user);
    });
});

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        // handle start chat requests
        if (request.command == START_CHAT_KEY) {
            var user = JSON.parse(request.data);
            startChat(user);
        }
    }
);

function startChat(user) {
    jQuery(".friendsList .start_chat_session").each(function() {
        var id = jQuery(this).find("input:hidden").val();
        if (user.id == id) {
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true,
                document.defaultView, 1, 0, 0, 0, 0, false,
                false, false, false, 0, null);
            this.dispatchEvent(evt);
        }
    });
}
