"use strict"
const http=require("http");
const fs=require("fs");
const express=require("express");
const bodyParser=require("body-parser");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const app = express();
const HEADERS = require("headers");
const PORT = process.env.PORT || 1337;
const DBNAME = "social";
const TTL=36000; //espresso in secondi
const NO_COOKIES="No cookies found";
const CONNECTIONSTRING="mongodb+srv://tagaru_mgmt:pa55word@socialcluster.f3sp6.mongodb.net";
const CONNECTIONOPTIONS = {useNewUrlParser: true, useUnifiedTopology: true};
var cloudinary = require('cloudinary').v2;
const CLOUDINARY_URL="cloudinary://566151146433116:P6yNKnfei9Q3UPBTSUQSoX6LEYA@tagaruapp"
cloudinary.config({
    cloud_name: 'tagaruapp',
    api_key: '566151146433116',
    api_secret: 'P6yNKnfei9Q3UPBTSUQSoX6LEYA'
});
let currentUser="";

let mongo=require("mongodb");
let mongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;

let paginaErrore;
let PRIVATE_KEY;

const server = http.createServer(app);
server.listen(PORT, function () {
    console.log("Server in ascolto sulla porta " + PORT);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

init();

function init() {
    fs.readFile("./static/error.html", function (err, data) {
        if (!err)
            paginaErrore = data.toString();
        else
            paginaErrore = "<h1>Risorsa non trovata</h1>";
    });
    fs.readFile("./keys/private.key", function(err,data){
        if(!err){
            PRIVATE_KEY=data.toString();
        }
        else{
            //Richiamo la route di gestione degli errori
            //next(err);
            console.log("File mancante: private.key");
            server.close();
        }
    });
}

// route di lettura parametri POST
app.use(bodyParser.urlencoded({"extended":true}));
app.use(bodyParser.json());

//Log dei parametri
app.use("/", function (req, res, next) {
    if (Object.keys(req.query).length > 0)
    {
        console.log("Parametri GET: " + JSON.stringify(req.query));
    }
    if (Object.keys(req.body).length > 0)
    {
        console.log("Parametri BODY: " + JSON.stringify(req.body));
    }
    next();
});

//Log della richiesta
app.use('/', function (req, res, next) {
    //originalUrl contiene la risorsa richiesta
    console.log(">>>>>>>>>> " + req.method + ":" + req.originalUrl);
    next();
});

// route per far rispondere il server a qualunque richiesta, anche extra domain
app.use("/", function(req,res,next){ 
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    next();
});

app.use('/', express.static("./static"));

app.post("/", controllaToken);

app.use(express.json({limit:'1000mb'}));

app.use("*",function(req,res,next){
    console.log(">>>>>>>> Risorsa: "+req.originalUrl.split('?')[0]+".");
    res.setHeader("Access-Controll-Allow_Origin","*");
    next();
});

/******************************** Token & Cookies *******************************************/

function controllaToken(req, res, next, method="GET") {
    let token = readCookie(req);
    console.log("Questo è il token: "+token);

    if(token==NO_COOKIES)
    {
        console.log(method);
        if(method.toUpperCase()=="POST")
        {
            return {"ris":"missingToken"}
        }
        else
        {
            inviaErrore(req, res, 403, "Token mancante");
        }
    }
    else
    {
        jwt.verify(token, PRIVATE_KEY, function(err, payload)
        {
            if(err)
            {
                if(method.toUpperCase()=="POST")
                {
                    return {"ris":"missingToken"}
                }
                else
                {
                    inviaErrore(req, res, 403, "Token expired or corrupted");
                }
            }
            else
            {
                let newToken=createToken(payload);
                writeCookie(res, newToken);
                req.payload=payload;
                if(method.toUpperCase()=="POST")
                {
                    return {"ris":"ok", "payload":payload}
                }
                else
                {
                    next();
                }
            }
        });
    }
    return {"ris":"no return required"};
}

function inviaErrore(req, res, cod, errMex)
{
    if(req.originalUrl.startsWith("/api"))
    {
        res.status(cod).send(errMex);
    }
    else
    {
        res.sendFile(`${__dirname}/static/index.html`);
    }
}

function readCookie(req){
    let valoreCookie=NO_COOKIES;
    if(req.headers.cookie)
    {
        let cookies=req.headers.cookie.split(";");
        for(let item of cookies)
        {
            item=item.split("=");
            if(item[0].includes("token"))
            {
                valoreCookie=item[1];
                break;
            }
        }
    }
    return valoreCookie;
}

function writeCookie(res, token, expires=TTL){
    res.set("Set-Cookie", `token=${token};expires=${expires};path=/;httponly=true;secure=true`);
}

function createToken(data){
    let param={
        "_id":data["_id"],
        "username":data.username,
        "email":data.email,
        "sesso":data.sesso,
        "iat":data.iat || Math.floor(Date.now()/1000),
        "exp":Math.floor(Date.now()/1000)+TTL
    }
    let token=jwt.sign(param, PRIVATE_KEY);
    return token;
}

/******************************** Login *******************************************/

app.post('/api/login', function(req, res, next) {
    mongoClient.connect(CONNECTIONSTRING, CONNECTIONOPTIONS, function(err, client) {
        if (err)
        {
            res.status(503).send("Errore di connessione al database.");
        }
        else
        {
            let db = client.db(DBNAME);
            let collection = db.collection('accounts');

            let mail=req.body.email;
            let pass=req.body.password;

            collection.findOne({"email": mail}, function(err, dbAccount) {
                currentUser=dbAccount.username;
                console.log(">>>>>>>>>> USERNAME:"+currentUser);
                if (err)
                {
                    res.status(500).send("Internal Error in Query Execution.");
                }
                else
                {
                    if (dbAccount == null)
                    {
                        res.status(401).send("Incorrect mail or password.");
                    }
                    else
                    {
                        if(pass == dbAccount.password) {
                            let newToken=createToken(dbAccount);
                            writeCookie(res, newToken);
                            res.send({"ris":"ok"});
                            client.close();
                        }
                        else {
                            res.status(401).send("Incorrect mail or password.");
                        }
                    }
                }
            });
        }
    });
});

app.post("/api/cercaMail/", function(req, res, next){
    mongoClient.connect(CONNECTIONSTRING, CONNECTIONOPTIONS, function(err, client) {
        if (err)
        {
            res.status(503).send("Errore di connessione al database.");
        }
        else
        {
            let mail=req.body.email;
            console.log(">>>>>>>>>> " + mail);

            let db = client.db(DBNAME);
            let collection = db.collection('accounts');

            collection.findOne({"email":mail}, function(err, data){
                if(err)
                {
                    res.status(500).send("Internal Error in Query Execution.");
                }
                else
                {
                    if(data)
                    {
                        res.send({"email":"found"});
                    }
                    else
                    {
                        res.send({"email":"not found"});
                    }
                    client.close();
                }
            });
        }
    });
});

app.post('/api/logout', function(req, res, next) {
    currentUser="";
    res.set("Set-Cookie", "token=;max-age=-1;Path=/;httponly=true;");
    res.send({"ris": "ok"});
});

app.post("/api/controllaToken", function (req, res, next) {
    let token = controllaToken(req, res, next, "POST");
    if(token["ris"]!="missingToken")
    {
        res.send({"ris":"token","_id":req.payload["_id"],"username":req.payload.username,"email":req.payload.email,"sesso":req.payload.sesso});
    }
    else
    {
        res.send(token);
    }
});

/******************************** Register *******************************************/

app.post("/api/register/", function (req, res, next) {
    console.log(req.body);
    mongoClient.connect(CONNECTIONSTRING, CONNECTIONOPTIONS, function(err, client){
        if (err)
        {
            res.status(503).send("Database connection error.");
        }
        else
        {
            let db = client.db(DBNAME);
            let collection = db.collection('accounts');
            collection.insertOne(req.body,function(err,data) {
                if(err)
                {
                    res.status(500).send("Internal Error in Query Execution.");
                }
                else
                {
                    if(data)
                    {
                        res.send({"ris":"ok"});
                    }
                    else
                    {
                        res.send({"ris":"nok"});
                    }
                    client.close();
                }
            });
        }
    });
});

/******************************** Upload Post *******************************************/

app.post('/api/getUsername', function(req, res, next) {
    currentUser=req.payload.username;
    console.log(currentUser);
    res.send({"username": currentUser});
});

app.post("/uploadImage", function(req, res, next){
    let image = req.body.image;
    console.log("HEY QUESTA E LA FOTO "+image);
    cloudinary.uploader.upload(image, function(result)
    {
        console.log(result);
        res.send(result);
    });
});

app.post("/api/newpost",function(req, res, next){
    
});

/******************************** After Token *******************************************/
app.post("/", controllaToken);

app.post("./static/index.html", controllaToken);

app.use("/api",controllaToken);

