// open tree in forum harmonica if branch gets focus using up/down actions
jQuery('.branchContainer').focus( function () {
    jQuery(this).parents('.treeContainer').children('.treeHeader.closed').click();
});