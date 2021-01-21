"use strict";

$(document).ready(function() {
    let i = 0;
    let txt = 'Tagaru'; /* The text */
    let speed = 70; /* The speed/duration of the effect in milliseconds */
    let propicInput=$("#propicInput");
    let imagepreview=$("#image-preview");
    let usernameInput=$("#usernameInput");
    let nomeInput=$("#nomeInput");
    let cognomeInput=$("#cognomeInput");
    let dobInput=$("#dobInput");
    let sessoInput=$("#sessoInput");
    let dobInput=$("#dobInput");
    let emailInput=$("#emailInput");
    let passwordInput=$("#passwordInput");
    let numTelInput=$("#numTelInput");
    let _email=emailInput.val();
    let _password=passwordInput.val();
    let btnRegister=$("#btnRegister").on("click",controllaRegistrazione);
    typeWriter();

    function controllaRegistrazione(){
        if (propicInput.val()=="") {
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
				window.location.href = "pages/register/register.html"
			});	
        }
    }
});

function showPreview(event){
    var src = URL.createObjectURL(event.target.files[0]);
    if(event.target.files.length > 0){
        document.getElementById("image-preview").style.display = "block";
        document.getElementById("image-preview").src = src;
    }
  };