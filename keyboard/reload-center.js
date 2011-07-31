// reload center every interval if enabled
chrome.extension.sendRequest({getOption: RELOADCENTER_INTERVAL_KEY}, function(response) {
var reloadcenterinterval = response.RELOADCENTER_INTERVAL_KEY;
if (reloadcenterinterval > 0) {
    function reloadCenter() {
        // reload only when not in an input area as we would lose typed in text
        if ( !/textarea|select/i.test( document.activeElement.nodeName ) &&
             !/text|password/i.test( document.activeElement.type ) ) {
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true,
                document.defaultView, 1, 0, 0, 0, 0, false,
                false, false, false, 0, null);
            jQuery('.reloadButton').each( function() {
                this.dispatchEvent(evt);
            });
        }
		window.setTimeout(reloadCenter, reloadcenterinterval);
    }
	window.setTimeout(reloadCenter, reloadcenterinterval);
}
});