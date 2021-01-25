"use strict";

$(document).ready(function () {
  let _btnPublish = $("#btnPublish");
  let _descrizione=$("#description");
  let _posttype;
  let currentUser;
  $("#video-preview").hover(hoverVideo, hideVideo);

  _btnPublish.on("click", cercaUsername);

  function hoverVideo(e) {
    $(this).get(0).play();
  };

  function hideVideo(e) {
    $(this).get(0).pause();
  };

  function cercaUsername() {
    let tokenRequest=inviaRichiesta("POST","/api/controllaToken");
    tokenRequest.fail(function() {
        console.log("Not logged in.");
    });
    tokenRequest.done(function(data){
        if(data["ris"]!="missingToken")
        {
            currentUser=data["username"];
            console.log("ciao");
        }
    });
    /*let request = inviaRichiesta("POST", "/api/getUsername");
    request.fail(errore);

    request.done(function(data)
    {
        console.log(data["username"]);
        openSnackbar(data["username"]);
    });*/
  }

  function showPreview(event) {
    _posttype="";
    var src = URL.createObjectURL(event.target.files[0]);
    if (event.target.files.length > 0) {
      var mimeType = event.target.files[0]['type'];
      if (mimeType.split('/')[0] === 'image') {
        _posttype="image";
        document.getElementById("image-preview").style.display = "block";
        document.getElementById("image-preview").src = src;
        document.getElementById("video-preview").style.display = "none";
      }

      if (mimeType.split('/')[0] === 'video') {
        _posttype="video";
        document.getElementById("image-preview").style.display = "none";
        document.getElementById("video-preview").style.display = "block";
        document.getElementById("video-preview").src = src;
      }
    }
  }
});

