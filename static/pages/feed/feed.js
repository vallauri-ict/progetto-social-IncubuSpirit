"use strict";

$(document).ready(function() {
    var figure = $(".video").hover( hoverVideo, hideVideo );
    let btnLike=$(".like");
    let btnDislike=$(".dislike");
    let likeImage=btnLike.children('img').prop('src', '../../img/heart-unclicked.png');
    let dislikeImage=btnDislike.children('img').prop('src', '../../img/broken-heart-unclicked.png');
    let feed=$("body");

    btnLike.on('click', clickLike);

    btnDislike.on('click',clickDislike);
    
    imagePost();

    function clickLike(){
        let _bar=$(this).parent();
        console.log(_bar);
        console.log(_bar.children());
        let _btnlike=_bar.children()[0];
        console.log(_btnlike);
        if(_btnLike.attr('class')=='unclicked')
        {
            likeImage.attr('src', '../../img/heart-liked.png');
            dislikeImage.attr('src', '../../img/broken-heart-unclicked.png');
        }
        else
            likeImage.attr('src', '../../img/heart-unclicked.png');
    }

    function clickDislike(){
        if(dislikeImage.attr('src')=='../../img/broken-heart-unclicked.png')
        {
            dislikeImage.attr('src', '../../img/broken-heart-disliked.png');
            likeImage.attr('src', '../../img/heart-unclicked.png');
        }
        else
            dislikeImage.attr('src', '../../img/broken-heart-unclicked.png');
    }

    function hoverVideo(e) {  
        figure.get(0).play(); 
    }

    function hideVideo(e) {
        figure.get(0).pause(); 
    }

    function imagePost() {
        let _imgPost=$("<div>").attr("class","post");
        let _imgContainer=$("<div>").attr("class","image-container");
        let _img=$("<img>").attr({"class":"image","src":"../../img/yoda.jpeg"});
        let _reactionBar=$("<div>").attr("class","reaction-bar");
        let _btnLike=$("<button>").attr("class","like unclicked");
        let _likeImage=$("<img>").attr('src', '../../img/heart-unclicked.png');
        let _btnDislike=$("<button>").attr("class","dislike unclicked");
        let _dislikeImage=$("<img>").attr('src', '../../img/broken-heart-unclicked.png');
        let _userDesc=$("<div>").attr("class","userDesc");
        let _username=$("<a>").attr({"class":"username","href":"#"});
        let _description=$("<div>").attr("class","description").html("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia felis et consequat venenatis. Suspendisse bibendum dui nisi, eget molestie sem rhoncus eu. Phasellus a leo finibus, tempus magna malesuada, ullamcorper erat. Proin vitae tellus non metus placerat euismod sit amet vel lectus. Praesent vel mollis dui.");
        let _lastcommentsContainer=$("<div>").attr("class","lastcomments-container");
        let _commentPreview=$("<div>").attr("class","comment-preview");
        let _textboxContainer=$("<div>").attr("class","textbox-container");
        let _txtComment=$("<div>").attr({"type":"text","class":"form-control txtComment","placeholder":"Scrivi un commento..."});
        let _blankSpace=$("<div>").attr("class","blank-space");
        
        _imgContainer.appendTo(_imgPost);
        _img.appendTo(_imgContainer);
        _reactionBar.appendTo(_imgPost);
        _btnLike.appendTo(_reactionBar).on('click', clickLike);
        _likeImage.appendTo(_btnLike);
        _btnDislike.appendTo(_reactionBar).on('click',clickDislike);
        _dislikeImage.appendTo(_btnDislike);
        _userDesc.appendTo(_imgPost);
        _username.appendTo(_userDesc);
        _description.appendTo(_userDesc);
        _lastcommentsContainer.appendTo(_imgPost);
        _commentPreview.appendTo(_lastcommentsContainer);
        _textboxContainer.appendTo(_imgPost);
        _txtComment.appendTo(_textboxContainer);
        _blankSpace.appendTo(_imgPost);
        _imgPost.appendTo(feed);
    }

    
});