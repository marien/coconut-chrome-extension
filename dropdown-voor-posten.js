jQuery.liveModify(".messageForm .msgFormButtons", function(elm){
    jQuery("<select></select>")
        .appendTo(elm)
        .append(jQuery("<option></option>").text("-- je netwerk --").attr("data-profile", jQuery("#profile_id").val()))
        .append(
            jQuery(".activeGroups li a")
                .map(function(id, elm){
                    return jQuery("<option></option>")
                        .attr("value",jQuery(elm).attr("href").split("/")[4])
                        .text(jQuery(elm).text())[0]
                })
        )
        .change(function(ev){
            var $this = jQuery(this);
            var groupId = $this.val();
            if (!groupId){
                jQuery("#profile_id").val($this.attr("data-profile"));
                jQuery("#group_id").val("");
            }
            else {
                jQuery("#profile_id").val("");
                jQuery("#group_id").val(groupId);
            }
        })
})
