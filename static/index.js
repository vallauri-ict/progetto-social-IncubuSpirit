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
});
