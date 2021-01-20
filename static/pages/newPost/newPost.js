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
    if(event.target.files.length > 0){
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
  }

  var mimeType=this.files[0]['type'];//mimeType=image/jpeg or application/pdf etc...


//ie image/jpeg will be ['image','jpeg'] and we keep the first value
    if(mimeType.split('/')[0] === 'image'){
       imageIsLoaded;
    }

    if(mimeType.split('/')[0] === 'video'){
      videoIsLoaded;
   }

    function imageIsLoaded(e) {
        result = e.target.result;
        $('#video-preview').attr('src', '');
        $('#image-preview').attr('src', result);
    };
    function videoIsLoaded(e) {
      result = e.target.result;
      $('#video-preview').attr('src', '');
      $('#image-preview').attr('src', result);
  };