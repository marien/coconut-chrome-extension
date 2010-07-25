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
                /*jQuery(document).bind('keydown', this.key, function () {
                    jQuery('<div id="chrome-terminel-keys"></div>')
                        .append(
                        jQuery.each(keys, function() {
                            //
                        });
                        return false;
                    });*/
                break;
        }
    }

    if (this.down != undefined) {
        var selector = this.down;
        jQuery(document).bind('keydown', this.key, function () {
                var selected = jQuery(selector).filter('.selected').first();
                var new_index = jQuery(selector).index(selected) + 1;
                if (new_index < jQuery(selector).length) {
                    jQuery(selected).removeClass('selected');
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
                    jQuery(selected).removeClass('selected');
                    var new_selected = jQuery(selector).get(new_index);
                    jQuery(new_selected).addClass('selected').attr('tabindex', '-1').focus().removeAttr('tabindex');
                }
                return false;
            }
        );
    }
});
