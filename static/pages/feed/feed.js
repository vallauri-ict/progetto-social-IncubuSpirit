"use strict";

$(document).ready(function() {
    var figure = $(".video").hover( hoverVideo, hideVideo );
    let btnLike=$(".like");
    let btnDislike=$(".dislike");
    let likeImage=btnLike.children('img').prop('src', '../../img/heart-unclicked.png');
    let dislikeImage=btnDislike.children('img').prop('src', '../../img/broken-heart-unclicked.png');

    btnLike.on({
        'click': function(){
        if(likeImage.attr('src')=='../../img/heart-unclicked.png')
        {
            likeImage.attr('src', '../../img/heart-liked.png');
            dislikeImage.attr('src', '../../img/broken-heart-unclicked.png');
        }
        else
            likeImage.attr('src', '../../img/heart-unclicked.png');
        }
    });

    btnDislike.on({
        'click': function(){
        if(dislikeImage.attr('src')=='../../img/broken-heart-unclicked.png')
        {
            dislikeImage.attr('src', '../../img/broken-heart-disliked.png');
            likeImage.attr('src', '../../img/heart-unclicked.png');
        }
        else
            dislikeImage.attr('src', '../../img/broken-heart-unclicked.png');
        }
    });

    function hoverVideo(e) {  
        figure.get(0).play(); 
    }

    function hideVideo(e) {
        figure.get(0).pause(); 
    }
});