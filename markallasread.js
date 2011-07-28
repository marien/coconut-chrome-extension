//plugin that makes sure that I don't have to worry about whether a DOM  
//element is added dynamically or not, and if it's reloaded using AJAX or 
//whatever. see below for an example usage
(function(){
    var $ = jQuery,
        selectors = {};
    function domEvent(ev){
        var elms;
        $.each(selectors, function(selector){
            elms = $(ev.srcElement).find(selector);
            if (elms.prevObject.is(selector)){
                elms = elms.andSelf()
            }
            elms.each(function(idx, elm){
                $.each(selectors[selector], function(idx, func){
                    func(elm);
                });
            }); 
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

jQuery.liveModify("div.widget_container a[href*='/forum/categories/show_non_read']", function(elm){
    jQuery("<a />")
        .attr("href", "/forum/categories/all_visited")
        .append(jQuery("<img />")
            .attr('src', '/images/transparent.gif')
            .attr('title', 'markeer alle reacties als gelezen')
            .css({backgroundPosition: "0px -260px", backgroundImage: 'url(/images/coconut/icon_sprite.png)', backgroundRepeat: "no-repeat", height: "20px", width: "20px", display: "block"})
            )
        .css({position: "absolute", left: "0px", top: "0px", width: "20px", height: "20px", display: "block", backgroundColor: '#038206'})
            .hover( function () { jQuery(this).css({backgroundColor: '#A9C4A9'}) }, 
                    function () { jQuery(this).css({backgroundColor: '#038206'}) } )
        .click(function(ev){
            var link, myEvent;
            ev.preventDefault(); //turn hyperlink into background call
            link = jQuery(this);
            link.children().css({backgroundImage: ''}).attr('src', "/images/coconut/loader_circle_20px_666666.gif");
            jQuery.get(link.attr("href"), function(){
                link.children().attr('src', '/images/transparent.gif').css({backgroundImage: 'url(/images/coconut/icon_sprite.png)'});
                myEvent = document.createEvent('MouseEvents');
                myEvent.initEvent( 'click', true, true );
                link.closest(".widget_container").find(".reloadButton")[0].dispatchEvent(myEvent); //refresh widget
            });
        })
        .insertAfter(elm);
});
