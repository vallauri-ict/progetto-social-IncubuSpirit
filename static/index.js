"use strict";

$(document).ready(function() {
    let i = 0;
    let txt = 'Tagaru'; /* The text */
    let speed = 70; /* The speed/duration of the effect in milliseconds */
    let center=$("#center");
    let btnHome=$("#btnHome");
    let btnSearch=$("#btnSearch");
    let btnNewPost=$("#btnNewPost");
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
    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("title").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
});

/* ********************* u can't touch this ************************ */

function inviaRichiesta(method, url, parameters = "") {
    let contentType;
    if (method.toUpperCase == "GET") contentType = "application/x-www-form-urlencoded; charset=UTF-8";
    else
    {
        contentType = "application/json;charset=utf-8";
        parameters=JSON.stringify(parameters);
    }

    return $.ajax({
        "url": url, //default: currentPage
        "type": method,
        "data": parameters,
        "contentType": contentType,
        "dataType": "json",
        "timeout": 5000
    });
}

function errore(jqXHR, testStatus, strError) {
    if (jqXHR.status == 0)
        alert("Connection refused or Server timeout");
    else if (jqXHR.status == 200)
        alert("Errore Formattazione dati\n" + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}