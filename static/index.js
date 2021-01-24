"use strict";

$(document).ready(function() {
    let i = 0;
    let txt = 'Tagaru'; /* The text */
    let speed = 70; /* The speed/duration of the effect in milliseconds */
    let center=$("#center");
    let btnHome=$("#btnHome");
    let btnSearch=$("#btnSearch");
    let btnNewPost=$("#btnNewPost");
    let btnProfile=$("#btnProfile").on("click",openForm);
    let btnCloseForm=$("#btnCloseForm").on("click",closeForm);
    let txtEmail=$("#txtEmail");
    let txtPassword=$("#txtPassword");
    let canLogin=false;
    let btnLogin=$("#btnLogin").on("click",verificaEmail);
    let btnLogout=$("#btnLogout").on("click",logout).hide();
    let btnRegister=$("#btnRegister").on("click",function(){
        window.location.href = "./pages/register/register.html"
    });
    typeWriter();
    let tokenRequest=inviaRichiesta("POST","/api/controllaToken");
    tokenRequest.fail(function() {
        console.log("Not logged in.");
    });
    tokenRequest.done(function(data){
        if(data["ris"]!="missingToken")
        {
            loggedUser();
        }
    })

    /*********************************** navbar buttons **************************************/
    btnSearch.on("click",function(){
        center.attr("src","./pages/search/search.html");
        i=0;
        document.getElementById("title").innerHTML="";
        typeWriter();
    });
    btnHome.on("click",function(){
        center.attr("src","pages/feed/feed.html");
        i=0;
        document.getElementById("title").innerHTML="";
        typeWriter();
    });
    btnNewPost.on("click",function(){
        center.attr("src","pages/newPost/newPost.html");
        i=0;
        document.getElementById("title").innerHTML="";
        typeWriter();
    })

    /*********************************** functions **************************************/
    function verificaEmail(){
        if (txtEmail.val() == "" && txtPassword.val() == "") {
            openSnackbar("Inserire l'email e la password!"); 
        } 	
        else if (txtEmail.val() == "") {
            openSnackbar("Inserire l'email!"); 
        } 
        else if (txtPassword.val() == "") {
            openSnackbar("Inserire la password!"); 
        }
        else {
            let request = inviaRichiesta("POST", "/api/cercaMail/", {"email":txtEmail.val()});
            request.fail(errore);

            request.done(function(data)
            {
                console.log(data);
                if(data["email"]=="found")
                {
                    controllaLogin();
                }
                else if(data["email"]=="not found")
                {
                    openSnackbar("Email inesistente! Registrati per poter fare il login!");
                }
            });
        }
    }


    function controllaLogin(){
        let passMd5 = CryptoJS.MD5(txtPassword.val()).toString();
        let request = inviaRichiesta("POST", "/api/login",
        {
            "email":txtEmail.val(),
            "password":passMd5
        });

        request.fail(errore);

        request.done(function(data)
        {
            btnCloseForm.click();
            openSnackbar("Login effettuato!");
            loggedUser();
        });
    }

    function loggedUser(){
        btnRegister.hide();
        txtEmail.hide();
        txtPassword.hide();
        $("#lblEmail").hide();
        $("#lblPassword").hide();
        btnLogin.hide();
        btnLogout.show();
    }

    function openSnackbar(msg) {
        // Get the snackbar DIV
        let _snackbar = $("#snackbar").html(msg);
      
        // Add the "show" class to DIV
        _snackbar.attr("class","snackbar show");
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){_snackbar.attr("class", "snackbar"); }, 3000);
      }


    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("title").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    function openForm() {
        document.getElementById("myForm").style.display = "block";
    }
      
    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }

    function logout() {
        let logoutRequest=inviaRichiesta("POST","/api/logout");
        logoutRequest.fail(errore);
        logoutRequest.done(function(data){
            window.location.reload(true);
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
});
