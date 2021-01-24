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
    let _email=txtEmail.val();
    let _password=txtPassword.val();
    let btnLogin=$("#btnLogin").on("click",controllaLogin);
    let btnRegister=$("#btnRegister").on("click",function(){
        let request = inviaRichiesta("GET", "/api/register");
			request.fail(function(jqXHR, test_status, str_error) {
				if (jqXHR.status == 401) {  // unauthorized
					_lblErrore.show();
				} else
					errore(jqXHR, test_status, str_error);
			});
			request.done(function(data) {
				window.location.href = "./pages/register/register.html"
			});	
    })
    typeWriter();

    /*********************************** navbar buttons **************************************/
    btnSearch.on("click",function(){
        center.attr("src","pages/search/search.html");
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
    function controllaLogin(){
        _email=txtEmail.val();
        _password=txtPassword.val();
        if (_email == "" && _password == "") {
            openSnackbar("Inserire l'email e la password!"); 
        } 	
        else if (_email == "") {
            openSnackbar("Inserire l'email!"); 
        } 
		else if (_password == "") {
            openSnackbar("Inserire la password!"); 
        }		
		else {
			let request = inviaRichiesta("POST", "/api/login", 
				{ "email": _email,
				  "pass": _password
				}
			);
			request.fail(function(jqXHR, test_status, str_error) {
				if (jqXHR.status == 401) {  // unauthorized
					_lblErrore.show();
				} else
					errore(jqXHR, test_status, str_error);
			});
			request.done(function(data) {
				window.location.href = "index.html"
			});	
        }
    }

    function openSnackbar(msg) {
        // Get the snackbar DIV
        let x = $("#snackbar").html(msg);
      
        // Add the "show" class to DIV
        x.attr("class","snackbar show");
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){x.attr("class", "snackbar"); }, 3000);
        _email="";
        _password="";
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
});
