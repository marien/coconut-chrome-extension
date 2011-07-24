jQuery(document).ready(function(){
    var users = {};
    jQuery(".start_chat_session").each(function() {
        var user = {
            id: jQuery(this).find("input:hidden").val(),
            name: jQuery(this).find(".personalTopSummaryName").text(),
            img: jQuery(this).find("img").attr('src')
        };
        users[user.id] = user;
    });
    chrome.extension.sendRequest({sendData: NETWORK_CONNECTIONS_KEY, data: JSON.stringify(users)});
});