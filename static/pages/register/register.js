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
});

