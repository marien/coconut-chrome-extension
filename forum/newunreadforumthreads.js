var index = 0;
var rotateTimeout = false;
var autocloseTimeout = false;

function init() {
    jQuery('a.next').bind('click', next);
    jQuery('a.previous').bind('click', previous);
    jQuery('div.reaction').bind('click', openReaction);
    jQuery('div.title').bind('click', openTopic);
    showReaction();
    updateTotal();
    resetRotate();
    setAutoClose();
}

function autoClose() {
    close();
}

function disableAutoClose() {
    if (autocloseTimeout) {
        window.clearTimeout(autocloseTimeout);
        autocloseTimeout = false;
    }
}

function setAutoClose() {
    if (getCloseNotificationInterval()) {
        autocloseTimeout = window.setTimeout(autoClose, getCloseNotificationInterval());
    }
}

function autoRotate() {
    var topics = JSON.parse(localStorage[NEW_TOPICS_KEY]);
    index++;
    if (index >= topics.length) {
        index = 0;
    }
    showReaction();

    rotateTimeout = window.setTimeout(autoRotate, 10000);
}

function resetRotate() {
    if (rotateTimeout) {
        window.clearTimeout(rotateTimeout);
    }
    rotateTimeout = window.setTimeout(autoRotate, 60000);
}

function next() {
    disableAutoClose();
    resetRotate();
    var topics = JSON.parse(localStorage[NEW_TOPICS_KEY]);
    index++;
    if (index >= topics.length) {
        index = 0;
    }
    showReaction();
}

function previous() {
    disableAutoClose();
    resetRotate();
    var topics = JSON.parse(localStorage[NEW_TOPICS_KEY]);
    index--;
    if (index < 0) {
        index = topics.length-1;
    }
    showReaction();
}

function openReaction() {
    disableAutoClose();
    resetRotate();
    var topics = JSON.parse(localStorage[NEW_TOPICS_KEY]);
    // remove topic from unread list
    var topic = topics.splice(index, 1)[0];
    // update unread list
    localStorage[NEW_TOPICS_KEY] = JSON.stringify(topics);
    // set index
    if (index >= topics.length) {
        index = topics.length - 1;
    }
    // open link
    chrome.tabs.create({url: topic.reactionsLink});
    // show new reaction
    showReaction();
}

function openTopic() {
    disableAutoClose();
    resetRotate();
    var topics = JSON.parse(localStorage[NEW_TOPICS_KEY]);
    // remove topic from unread list
    var topic = topics.splice(index, 1)[0];
    // update unread list
    localStorage[NEW_TOPICS_KEY] = JSON.stringify(topics);
    // set index
    if (index >= topics.length) {
        index = topics.length - 1;
    }
    // get topic url from reaction url and open link
    chrome.tabs.create({url: topic.reactionsLink.split('?')[0]});
    // show new reaction
    showReaction();
}

function showReaction() {
    var topics = JSON.parse(localStorage[NEW_TOPICS_KEY]);
    // close if we have no (more) topics to show
    if (topics.length == 0) {
        close();
    }
    // reset index if out of range
    if (index >= topics.length || index < 0) {
        index = 0;
    }
    var topic = topics[index];
    jQuery('div.title').text(topic.topicTitle).prepend('<div class="topicDate"></div>').attr('alt',topic.topicTitle);
    jQuery('div.topicDate').text(topic.reactionTime);
    // check if avatar url contains the full url..
    var url = topic.userAvatarUrl;
    if (url.indexOf('http') != 0) {
        url = getCoconutUrl() + url;
    }
    jQuery('div.reactionImage > img').attr('src',url);
    jQuery('div.reactionImage > img').attr('alt',topic.userName);
    jQuery('div.reactionContent').text(topic.shortContent).attr('alt',topic.shortContent);
    jQuery('div.paginationContainerNumber').text('' + (index+1) + '/' + topics.length);
}

function updateTotal() {
    var topics = JSON.parse(localStorage[NEW_TOPICS_KEY]);
    jQuery('div.paginationContainerNumber').text('' + (index+1) + '/' + topics.length);
    window.setTimeout(updateTotal, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});