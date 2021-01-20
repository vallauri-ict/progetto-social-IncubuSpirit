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
<<<<<<< HEAD
       imageIsLoaded();
    }

    if(mimeType.split('/')[0] === 'video'){
      videoIsLoaded();
   }
=======
      $('#video-preview').attr('src', '');
      $('#image-preview').attr('src', src);
    }

    if(mimeType.split('/')[0] === 'video'){
      $('#image-preview').attr('src', '');
      $('#video-preview').attr({'src': src,'display':'block'});
    }
  }
}

  
>>>>>>> 401ff3eb073bcf1ab23f71090a4b912b13a8c68a

    function imageIsLoaded(e) {
        result = e.target.result;
        $('#video-preview').attr('src', '');
        $('#image-preview').attr('src', result);
    };
    function videoIsLoaded(e) {
      result = e.target.result;
      
  };