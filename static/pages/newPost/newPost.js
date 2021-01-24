"use strict";

let _posttype;

$(document).ready(function () {
  let _btnPublish = $("#btnPublish");
  let _descrizione=$("#description");
  $("#video-preview").hover(hoverVideo, hideVideo);

  _btnPublish.on("click", function () {
    if(_descrizione.attr("value")!=""||)
    let request = inviaRichiesta("GET", "/api/newpost",{

    });
    request.fail(function (jqXHR, test_status, str_error) {
      if (jqXHR.status == 401) { // unauthorized
        _lblErrore.show();
      } else
        errore(jqXHR, test_status, str_error);
    });
    request.done(function (data) {
      center.attr("src", "pages/feed/feed.html");
    });
  });
});

function hoverVideo(e) {
  $(this).get(0).play();
};

function hideVideo(e) {
  $(this).get(0).pause();
};

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
};