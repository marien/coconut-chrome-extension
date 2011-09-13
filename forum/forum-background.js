var notification = false;
function getForumUnreadCount() {
    chrome.browserAction.setBadgeText({text: "." });

	function onSuccess(count) {
		chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
		chrome.browserAction.setBadgeText({text: count != 0 ? count.toString() : ""});
		chrome.browserAction.setIcon({path:"img/icon19.png"});
		window.setTimeout(getForumUnreadCount, getRefreshInterval());
	}

	function onError() {
		chrome.browserAction.setBadgeText({text: "?"});
		chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
		chrome.browserAction.setIcon({path:"img/icon19g.png"});
		window.setTimeout(getForumUnreadCount, getRefreshInterval());
	}

    function showNotifications(topics) {
        // loading initial set of topics
        if (localStorage[PREVIOUS_TOPICS_KEY] == undefined || !localStorage[PREVIOUS_TOPICS_KEY]) {
            localStorage[PREVIOUS_TOPICS_KEY] = JSON.stringify(topics);
            return;
        }
        // seed localStorage for NEW_TOPICS_KEY
        if (localStorage[NEW_TOPICS_KEY] == undefined || !localStorage[NEW_TOPICS_KEY]) {
            localStorage[NEW_TOPICS_KEY] = JSON.stringify([]);
        }
        // check options
        if (getNotifications() && getBoolOption(FORUM_NEW_TOPIC_NOTIFICATION_KEY)) {
            var prev_topics = JSON.parse(localStorage[PREVIOUS_TOPICS_KEY]);
            var new_topics = [];
            // store all new topics
            jQuery(topics).each(function () {
                var found = false;
                var rlink = this.reactionsLink;
                jQuery.each(prev_topics, function() {
                    found = found || this.reactionsLink == rlink;
                });
                if (!found) {
                    new_topics.push(this);
                }
            });
            // store new list of new topics in localstorage
            new_topics = JSON.parse(localStorage[NEW_TOPICS_KEY]).concat(new_topics.reverse());
            localStorage[NEW_TOPICS_KEY] = JSON.stringify(new_topics);
            // create notification if necessary
            if ((new_topics.length > 0) && (!notification) ) {
                // show notification
                notification = webkitNotifications.createHTMLNotification('forum/newunreadforumthreads.html');
                notification.onclose = function() {
                    localStorage[NEW_TOPICS_KEY] = JSON.stringify([]);
                    notification = false;
                };
                notification.show();
            }
        }
        // store previous topics for comparison on next update
        localStorage[PREVIOUS_TOPICS_KEY] = JSON.stringify(topics);
    }

	jQuery.ajax({
		url: getCoconutUrl() + 'forum/categories/show_non_read.json',
		success: function (data) {
			if (data.topics != undefined)
            {
				onSuccess(data.topics.length);
                showNotifications(data.topics);
            }
			else
            {
				onError();
            }
		},
		error: function (data) {
			onError();
		}
	});
}