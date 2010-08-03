// open tree in forum harmonica if branch gets focus using up/down actions
jQuery('.branchContainer').focus( function () {
    jQuery(this).parents('.treeContainer').children('.treeHeader.closed').click();
});

// load more messages when reaching the bottom messages
var selector = '.messageBlock > div:first-child';
jQuery(selector).live( 'focus', function () {
    var index = jQuery(selector).index(this);
    var length = jQuery(selector).length;
    if (index >= length-2) {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true,
            document.defaultView, 1, 0, 0, 0, 0, false,
            false, false, false, 0, null);
        jQuery('.more > a').each( function() {
            this.dispatchEvent(evt);
        });
    }
});
