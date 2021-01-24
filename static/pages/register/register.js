"use strict";

$(document).ready(function () {
    let usernameInput = $("#usernameInput");
    let nomeInput = $("#nomeInput");
    let cognomeInput = $("#cognomeInput");
    let dobInput = $("#dobInput");
    let sessoInput = $("#sessoInput");
    let emailInput = $("#emailInput");
    let passwordInput = $("#passwordInput");
    let numTelInput = $("#numTelInput");
    let btnRegister = $("#btnRegister").on("click", cercaEmail);

    function controllaRegistrazione(){  
        let sesso=$('option[name="selSesso"]:selected').val();
        let passMd5 = CryptoJS.MD5(passwordInput.val()).toString();
        let request = inviaRichiesta("POST", "/api/register/",
        {
            "username":usernameInput.val(),
            "nome":nomeInput.val(),
            "cognome":cognomeInput.val(),
            "sesso":sesso,
            "dataNascita":dobInput.val(),
            "email":emailInput.val(),
            "password":passMd5,
            "numTel":numTelInput.val()
        });

        request.fail(errore);

        request.done(function(data)
        {
            window.location.href="../../index.html"
        });
    }
            
    function cercaEmail(){
        if (usernameInput.val()=="" ||
            nomeInput.val()=="" ||
            cognomeInput.val()=="" ||
            dobInput.val()=="" ||
            sessoInput.val()=="" ||
            emailInput.val()=="" ||
            passwordInput.val()=="" ||
            numTelInput.val()=="")
            openSnackbar("Campo/i mancante/i!"); 
        else {
            let request = inviaRichiesta("POST", "/api/cercaMail/", {"email":emailInput.val()});
            request.fail(errore);

            request.done(function(data)
            {
                console.log(data);
                if(data["email"]=="found")
                {
                    openSnackbar("Email già esistente! Effettua il login per continuare!");
                }
                else if(data["email"]=="not found")
                {
                    controllaRegistrazione();
                }
            });
        }
    }
});

