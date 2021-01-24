"use strict";

$(document).ready(function() {
    let feed=$("body");
    
    function hoverVideo(e) {  
        $(this).get(0).play(); 
    }

    function hideVideo(e) {
        $(this).get(0).pause();
    }

    imagePost("../../img/yoda.jpeg","looks cool don't ya?","IncubuSpirit");
    videoPost("../../img/video.mp4","looks cool don't ya?","IncubuSpirit");
    textPost("looks cool don't ya?","IncubuSpirit");

    function clickLike(){
        let _bar=$(this).parent();
        let _btndislike=_bar.children().eq(1);
        let _btnlike=$(this);
        let _likeimage=_btnlike.children().eq(0);
        let _dislikeimage=_btndislike.children().eq(0);
        if(_btnlike.hasClass("unclicked"))
        {
            _btnlike.removeClass("unclicked");
            _btnlike.addClass("clicked");
            if(_btndislike.hasClass("clicked"))
            {
                _btndislike.removeClass("clicked");
                _btndislike.addClass("unclicked");
                _dislikeimage.attr('src', '../../img/broken-heart-unclicked.png');
            }
            _likeimage.attr('src', '../../img/heart-liked.png');
            _dislikeimage.attr('src', '../../img/broken-heart-unclicked.png');
        }
        else
        {
            _likeimage.attr('src', '../../img/heart-unclicked.png');
            _btnlike.removeClass("clicked");
            _btnlike.addClass("unclicked");
        }
        let request=inviaRichiesta("POST", "/api/richiestaPOST", {"reaction":"like"});
        request.done(function(data) {console.log(data)});
        request.fail(errore);    
    }

    function clickDislike(){
        let _bar=$(this).parent();
        let _btnlike=_bar.children().eq(0);
        let _btndislike=$(this);
        let _dislikeimage=_btndislike.children().eq(0);
        let _likeimage=_btnlike.children().eq(0);
        if(_btndislike.hasClass("unclicked"))
        {
            _btndislike.removeClass("unclicked");
            _btndislike.addClass("clicked");
            if(_btnlike.hasClass("clicked"))
            {
                _btnlike.removeClass("clicked");
                _btnlike.addClass("unclicked");
                _likeimage.attr('src', '../../img/heart-unclicked.png');
            }
            _dislikeimage.attr('src', '../../img/broken-heart-disliked.png');
            _likeimage.attr('src', '../../img/heart-unclicked.png');
        }
        else
        {
            _dislikeimage.attr('src', '../../img/broken-heart-unclicked.png');
            _btndislike.removeClass("clicked");
            _btndislike.addClass("unclicked");
        }
        let request=inviaRichiesta("POST", "/api/richiestaPOST", {"reaction":"dislike"});
        request.done(function(data) {console.log(data)});
        request.fail(errore);   
    }

    function imagePost(img_url,desc,usname) {
        let _imgPost=$("<div>").attr("class","post");
        let _imgContainer=$("<div>").attr("class","image-container");
        let _img=$("<img>").attr({"class":"image","src":img_url});
        let _reactionBar=$("<div>").attr("class","reaction-bar");
        let _btnLike=$("<button>").attr("class","like unclicked");
        let _likeImage=$("<img>").attr('src', '../../img/heart-unclicked.png');
        let _btnDislike=$("<button>").attr("class","dislike unclicked");
        let _dislikeImage=$("<img>").attr('src', '../../img/broken-heart-unclicked.png');
        let _userDesc=$("<div>").attr("class","userDesc");
        let _username=$("<a>").attr({"class":"username","href":"#"}).html(usname+" - ");
        let _description=$("<div>").attr("class","description").html(desc);
        let _lastcommentsContainer=$("<div>").attr("class","lastcomments-container");
        let _commentPreview=$("<div>").attr("class","comment-preview");
        let _textboxContainer=$("<div>").attr("class","textbox-container");
        let _txtComment=$("<input>").attr({"type":"text","class":"form-control txtComment","placeholder":"Scrivi un commento..."});
        let _blankSpace=$("<div>").attr("class","blank-space");
        
        _imgContainer.appendTo(_imgPost);
        _img.appendTo(_imgContainer);
        _reactionBar.appendTo(_imgPost);
        _btnLike.appendTo(_reactionBar).on('click', clickLike);
        _likeImage.appendTo(_btnLike);
        _btnDislike.appendTo(_reactionBar).on('click',clickDislike);
        $(".like").on("click",function(){
            let request=inviaRichiesta("POST", "/api/richiestaPOSTReactions", {"reaction":"like"});
            request.done(function(data) {console.log(data)});
            request.fail(errore); 
        });
        $(".dislike").on("click",function(){
            let request=inviaRichiesta("POST", "/api/richiestaPOSTReactions", {"reaction":"dislike"});
            request.done(function(data) {console.log(data)});
            request.fail(errore); 
        });
        _dislikeImage.appendTo(_btnDislike);
        _username.appendTo(_userDesc);
        _description.appendTo(_userDesc);
        _userDesc.appendTo(_imgPost);
        _lastcommentsContainer.appendTo(_imgPost);
        _commentPreview.appendTo(_lastcommentsContainer);
        _textboxContainer.appendTo(_imgPost);
        _txtComment.appendTo(_textboxContainer);
        _blankSpace.appendTo(_imgPost);
        _imgPost.appendTo(feed);
    }

    function videoPost(video_url,desc,usname) {
        let _videoPost=$("<div>").attr("class","post");
        let _videoContainer=$("<div>").attr("class","video-container");
        let _video=$("<video loop muted controls>").attr({"class":"video","src":video_url}).hover( hoverVideo, hideVideo );
        let _reactionBar=$("<div>").attr("class","reaction-bar");
        let _btnLike=$("<button>").attr("class","like unclicked");
        let _likeImage=$("<img>").attr('src', '../../img/heart-unclicked.png');
        let _btnDislike=$("<button>").attr("class","dislike unclicked");
        let _dislikeImage=$("<img>").attr('src', '../../img/broken-heart-unclicked.png');
        let _userDesc=$("<div>").attr("class","userDesc");
        let _username=$("<a>").attr({"class":"username","href":"#"}).html(usname+" - ");
        let _description=$("<div>").attr("class","description").html(desc);
        let _lastcommentsContainer=$("<div>").attr("class","lastcomments-container");
        let _commentPreview=$("<div>").attr("class","comment-preview");
        let _textboxContainer=$("<div>").attr("class","textbox-container");
        let _txtComment=$("<input>").attr({"type":"text","class":"form-control txtComment","placeholder":"Scrivi un commento..."});
        let _blankSpace=$("<div>").attr("class","blank-space");
        
        _videoContainer.appendTo(_videoPost);
        _video.appendTo(_videoContainer);
        _reactionBar.appendTo(_videoPost);
        _btnLike.appendTo(_reactionBar).on('click', clickLike);
        _likeImage.appendTo(_btnLike);
        _btnDislike.appendTo(_reactionBar).on('click',clickDislike);
        _dislikeImage.appendTo(_btnDislike);
        _username.appendTo(_userDesc);
        _description.appendTo(_userDesc);
        _userDesc.appendTo(_videoPost);
        _lastcommentsContainer.appendTo(_videoPost);
        _commentPreview.appendTo(_lastcommentsContainer);
        _textboxContainer.appendTo(_videoPost);
        _txtComment.appendTo(_textboxContainer);
        _blankSpace.appendTo(_videoPost);
        _videoPost.appendTo(feed);
    }

    function textPost(txt,usname) {
        let _textPost=$("<div>").attr("class","post");
        let _textContainer=$("<div>").attr("class","text-container");
        let _text=$("<p>").html(txt);
        let _reactionBar=$("<div>").attr("class","reaction-bar-text");
        let _btnLike=$("<button>").attr("class","like unclicked");
        let _likeImage=$("<img>").attr('src', '../../img/heart-unclicked.png');
        let _btnDislike=$("<button>").attr("class","dislike unclicked");
        let _dislikeImage=$("<img>").attr('src', '../../img/broken-heart-unclicked.png');
        let _userDesc=$("<div>").attr("class","userDesc");
        let _username=$("<a>").attr({"class":"username","href":"#"}).html(usname);
        let _lastcommentsContainer=$("<div>").attr("class","lastcomments-container");
        let _commentPreview=$("<div>").attr("class","comment-preview");
        let _textboxContainer=$("<div>").attr("class","textbox-container");
        let _txtComment=$("<input>").attr({"type":"text","class":"form-control txtComment","placeholder":"Scrivi un commento..."});
        let _blankSpace=$("<div>").attr("class","blank-space");
        
        _textContainer.appendTo(_textPost);
        _text.appendTo(_textContainer);
        _btnLike.appendTo(_reactionBar).on('click', clickLike);
        _likeImage.appendTo(_btnLike);
        _btnDislike.appendTo(_reactionBar).on('click',clickDislike);
        _dislikeImage.appendTo(_btnDislike);
        _username.appendTo(_userDesc);
        _userDesc.appendTo(_textPost);
        _lastcommentsContainer.appendTo(_textPost);
        _commentPreview.appendTo(_lastcommentsContainer);
        _textboxContainer.appendTo(_textPost);
        _txtComment.appendTo(_textboxContainer);
        _blankSpace.appendTo(_textPost);
        _reactionBar.appendTo(_textPost);
        _textPost.appendTo(feed);
    }
});