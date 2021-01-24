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

    function datiProfilo(img,username,nome,cognome,dob,email,password,numTel){
        imagepreview.attr("src",img);
        usernameInput.attr("value",username);
        nomeInput.attr("value",nome);
        cognomeInput.attr("value",cognome);
        dobInput.attr("value",dob);
        emailInput.attr("value",email);
        passwordInput.attr("value",password);
        numTelInput.attr("value",numTel);
    }
});