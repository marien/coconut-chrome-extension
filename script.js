// add keyboard navigation if enabled
chrome.extension.sendRequest({getOption: KEYBOARD_NAVIGATION_KEY}, function(response) {
if (response.KEYBOARD_NAVIGATION_KEY) {
jQuery.each(keys, function() {

    if (this.link != undefined) {
        var selector = this.link;
        jQuery(document).bind('keydown', this.key, function () {
                if (jQuery(selector).length !== 0)
                {
                    document.location = jQuery(selector).first().attr('href');
                }
                return false;
            }
        );
    }

    if (this.url != undefined) {
        var url = this.url;
        jQuery(document).bind('keydown', this.key, function () {
                document.location = url;
                return false;
            }
        );
    }

    if (this.focus != undefined) {
        var selector = this.focus;
        jQuery(document).bind('keydown', this.key, function () {
                jQuery(selector).first().focus();
                return false;
            }
        );
        // todo: iets bedenken op keys waarvan de elementen via ajax geladen worden..
        jQuery(selector).bind('keyup', 'esc', function () {
                jQuery(selector).blur();
                return false;
            }
        );
    }

    if (this.click != undefined) {
        var selector = this.click;
        jQuery(document).bind('keydown', this.key, function () {
                var evt = document.createEvent('MouseEvents');
                evt.initMouseEvent('click', true, true,
                    document.defaultView, 1, 0, 0, 0, 0, false,
                    false, false, false, 0, null);
                jQuery(selector).each( function() {
                    this.dispatchEvent(evt);
                });
                return false;
            }
        );
    }

    if (this.action != undefined) {
        switch(this.action) {
            case 'help':
                jQuery(document).bind('keydown', this.key, function () {
                        var help = jQuery('<div id="help"></div>');
                        var title = jQuery('<div class="help-title">Toetsenbord navigatie</div>').appendTo(help);
                        var listleft = jQuery('<div class="help-list help-left"></div>').appendTo(help);
                        var listright = jQuery('<div class="help-list help-right"></div>').appendTo(help);
                        var list = [];
                        jQuery.each(keys, function() {
                            var action = 'unknown';
                            var selector = '';
                            var desc = '';
                            if (this.link != undefined) {
                                action = 'link';
                                selector = this.link;
                                desc = this.link;
                            }
                            else if (this.url != undefined) {
                                action = 'url';
                                selector = 'body';
                                desc = this.url;
                            }
                            else if (this.focus != undefined) {
                                action = 'focus';
                                selector = this.focus;
                                desc = this.focus;
                            }
                            else if (this.click != undefined) {
                                action = 'click';
                                selector = this.click;
                                desc = this.click;
                            }
                            else if (this.action != undefined) {
                                action = 'action';
                                selector = 'body';
                                desc = this.action;
                            }
                            else if (this.up != undefined) {
                                action = 'up';
                                selector = this.up;
                                desc = this.up;
                            }
                            else if (this.down != undefined) {
                                action = 'down';
                                selector = this.down;
                                desc = this.down;
                            }
                            if (this.help_selector != undefined){
                                selector = this.help_selector;
                            }
                            // test which keys are visible
                            if ( jQuery(selector).length > 0 ) {
                                var item = jQuery('<tr class="help-item" title="action: ' + action + ' css-selector: ' + desc + '"></tr>');
                                var key = jQuery('<td class="help-key"></td>').appendTo(item);
                                var ors = this.key.split(' ');
                                for (var orc = 0; orc < ors.length; orc++) {
                                    var thens = ors[orc].split(';');
                                    for (var thenc = 0; thenc < thens.length; thenc++) {
                                        var ands = thens[thenc].split('+');
                                        for (var andc = 0; andc < ands.length; andc++) {
                                            jQuery('<span class="help-char">' + ands[andc] + '</span>').appendTo(key);
                                            if (andc < ands.length-1) {
                                                jQuery('<span class="help-and"> en </span>').appendTo(key);
                                            }
                                        }
                                        if (thenc < thens.length-1) {
                                            jQuery('<span class="help-then"> vervolgens </span>').appendTo(key);
                                        }
                                    }
                                    if (orc < ors.length-1) {
                                        jQuery('<span class="help-or"> of </span>').appendTo(key);
                                    }
                                }
                                jQuery('<span class="help-seperator"> : </span>').appendTo(key);
                                jQuery('<td class="help-message">' + this.help_message + '</td>').appendTo(item);
                                list.push(item);
                            }
                        });
                        // add to left or right list
                        for (var listc = 0; listc < list.length; listc++) {
                            if (listc < ( list.length / 2 )) {
                                list[listc].appendTo(listleft);
                            } else {
                                list[listc].appendTo(listright);
                            }
                        }
                        help.modal({overlayClose:true, zIndex: 1500});
                    });
                break;
        }
    }

    if (this.down != undefined) {
        var selector = this.down;
        jQuery(document).bind('keydown', this.key, function () {
                var selected = jQuery(selector).filter('.selected').first();
                var new_index = jQuery(selector).index(selected) + 1;
                if (new_index < jQuery(selector).length) {
                    jQuery(selector).filter('.selected').removeClass('selected');
                    var new_selected = jQuery(selector).get(new_index);
                    jQuery(new_selected).addClass('selected').attr('tabindex', '-1').focus().removeAttr('tabindex');
                }
                return false;
            }
        );
    }

    if (this.up != undefined) {
        var selector = this.up;
        jQuery(document).bind('keydown', this.key, function () {
                var selected = jQuery(selector).filter('.selected').first();
                var new_index = jQuery(selector).index(selected) - 1;
                if (new_index >= 0) {
                    jQuery(selector).filter('.selected').removeClass('selected');
                    var new_selected = jQuery(selector).get(new_index);
                    jQuery(new_selected).addClass('selected').attr('tabindex', '-1').focus().removeAttr('tabindex');
                }
                return false;
            }
        );
    }
});
}});

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