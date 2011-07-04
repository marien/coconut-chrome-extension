//crappy plugin that makes sure that I don't have to worry about whether a DOM  
//element is added dynamically or not, and if it's reloaded using AJAX or 
//whatever. see below for an example usage
(function(){
    var $ = jQuery,
        selectors = {};
    function domEvent(ev){
        var elm;
        elm = ev.srcElement;
        $.each(selectors, function(selector){
            //FIXME: if the element sometimes is a subelement of the added tree
            //you need to fix that here
            if ($(elm).is(selector)){
                $.each(selectors[selector], function(idx, func){
                    func(elm);
                });
            }
        });
    }
    document.addEventListener("DOMNodeInserted", domEvent, false);

    $.liveModify = function(selector, func){
        if (selectors[selector] === undefined){
            selectors[selector] = []
        }
        selectors[selector].push(func);
        //Call immediately in case the element already exists
        $(selector).each(function(idx, obj){
            func(obj);
        })
    }
})();

jQuery.liveModify("a[href='https://coconut.ogd.nl/forum/categories/show_non_read']", function(elm){
    var $ = jQuery;
    $("<a />")
        .attr("href", "https://coconut.ogd.nl/forum/categories/all_visited")
        .text("markeer alle reacties als gelezen")
        .addClass("widgetFooterLink")
        .click(function(ev){
            var $link, $spinner, myEvent;
            ev.preventDefault(); //turn hyperlink into background call
            $link = $(this); 
            $spinner = $("<img>")
                        .attr("src", '/images/coconut/loader_circle_20px_666666.gif')
                        .css({paddingTop:"20px", "background-image":"None"});
            $link.append($spinner);
            $.get($link.attr("href"), function(){
                $spinner.remove();
                myEvent = document.createEvent('MouseEvents');
                myEvent.initEvent( 'click', true, true );
                $link.closest(".widget_container").find(".reloadButton")[0].dispatchEvent(myEvent); //refresh widget
            });
        })
        .insertAfter(elm);
});
