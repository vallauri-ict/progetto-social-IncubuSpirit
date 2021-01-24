"use strict";

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
        swal("Error!", "Connection refused or Server timeout", "error");
    }
    else if(jqXHR.status == 403)
    {
        window.location.href="pages/register/register.html";
    }
    else if (jqXHR.status == 200)
    {
        swal("Error!", "Data format uncorrect: " + jqXHR.responseText, "error");
    }
    else
    {
        swal("Error!", "Server Error: " + jqXHR.status + " - " + jqXHR.responseText, "error");
    }
}