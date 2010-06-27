// todo:
// - iets bedenken op keys waarvan de elementen via ajax geladen worden..
// - modifiers ala google toevoegen (i.e. g + h wordt go home, c + a wordt content action, c + / wordt content search)
// - tonen welke actie uitgevoerd gaat worden
// - timers toevoegen om met esc acties te annuleren (moet je wel heel snel zijn!)

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
                jQuery(selector).first().click();
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
});