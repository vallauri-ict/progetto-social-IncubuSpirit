"use strict";

$(document).ready(function(){
    let imagepreview = $("#image-preview");
    let usernameInput = $("#usernameInput");
    let nomeInput = $("#nomeInput");
    let cognomeInput = $("#cognomeInput");
    let dobInput = $("#dobInput");
    let dobInput = $("#dobInput");
    let emailInput = $("#emailInput");
    let passwordInput = $("#passwordInput");
    let numTelInput = $("#numTelInput");
    let _email = emailInput.val();
    let _password = passwordInput.val();

    let Request=inviaRichiesta("POST","/api/profilo");
    Request.fail(function() {
        console.log("Not logged in.");
    });
    tokenRequest.done(function(data){
        if(data["ris"]!="missingToken")
        {
            loggedUser();
        }
    })(img,username,nome,cognome,dob,email,password,numTel){
        usernameInput.attr("value",username);
        nomeInput.attr("value",nome);
        cognomeInput.attr("value",cognome);
        dobInput.attr("value",dob);
        emailInput.attr("value",email);
        passwordInput.attr("value",password);
        numTelInput.attr("value",numTel);
    }
});