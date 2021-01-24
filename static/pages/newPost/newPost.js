"use strict";

$(document).ready(function(){
    let _btnPublish=$("#btnPublish");
    $("#video-preview").hover( hoverVideo, hideVideo );

    _btnPublish.on("click", controllaLogin);

    function controllaLogin() {
      let tokenRequest=inviaRichiesta("POST","/api/controllaToken");
      tokenRequest.fail(function() {
          console.log("Not logged in.");
      });
      tokenRequest.done(function(data){
          if(data["ris"]!="missingToken")
          {
              console.log("POST PUBBLICATO");
          }
      });
    }

    /* ********************* u can't touch this ************************ */

    function inviaRichiesta(method, url, parameters = {}) {
      let contentType;
      if (method.toUpperCase() == "GET")
      {
          contentType = "application/x-www-form-urlencoded; charset=UTF-8"
      }
      else
      {
          contentType = "application/json; charset=UTF-8"
          parameters = JSON.stringify(parameters);
      }

      return $.ajax({
          url: url, //default: currentPage
          type: method,
          data: parameters,
          contentType: contentType,
          dataType: "json",
          timeout: 5000
      });
  }


  function errore(jqXHR, testStatus, strError) {
      if (jqXHR.status == 0)
      {
          openSnackbar("Connection refused or Server timeout");
      }
      else if(jqXHR.status == 403)
      {
          openSnackbar("Errore durante il login!");
      }
      else if (jqXHR.status == 200)
      {
          openSnackbar("Data format uncorrect: " + jqXHR.responseText);
      }
      else
      {
          openSnackbar("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
      }
  }
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
    var mimeType=event.target.files[0]['type'];
    if(mimeType.split('/')[0] === 'image'){
      document.getElementById("image-preview").style.display = "block";
      document.getElementById("image-preview").src = src;
      document.getElementById("video-preview").style.display = "none";
    }

    if(mimeType.split('/')[0] === 'video'){
      document.getElementById("image-preview").style.display = "none";
      document.getElementById("video-preview").style.display = "block";
      document.getElementById("video-preview").src = src;
    }
  }
}
