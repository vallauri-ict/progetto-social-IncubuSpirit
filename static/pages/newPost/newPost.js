"use strict";

$(document).ready(function(){
    let _btnPublish=$("#btnPublish");
    $("#video-preview").hover( hoverVideo, hideVideo );

    _btnPublish.on("click",function(){
        alert("hello boya");
    })
})

function hoverVideo(e) {  
  $(this).get(0).play(); 
}

function hideVideo(e) {
  $(this).get(0).pause();
}

function showPreview(event){
  var src = URL.createObjectURL(event.target.files[0]);
  if(event.target.files.length > 0){
    var mimeType=this.files[0]['type'];
    if(mimeType.split('/')[0] === 'image'){
      $('#video-preview').attr('src', '');
      $('#image-preview').attr('src', src);
    }

    if(mimeType.split('/')[0] === 'video'){
      $('#image-preview').attr('src', '');
      $('#video-preview').attr({'src': src,'display':'block'});
    }
  }
}