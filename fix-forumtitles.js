var $forumtitle = jQuery(".forumPostsShow .postTitle .showTitle")
if ($forumtitle.length){
    document.title = $forumtitle.text();
}
