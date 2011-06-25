jQuery(document).ready(function($){
    var $forumtitle = $(".forumPostsShow .postTitle")
    if ($forumtitle.length){
        document.title = $forumtitle.text();
    }
});
