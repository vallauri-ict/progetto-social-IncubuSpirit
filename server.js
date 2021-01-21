"use strict"
const http=require("http");
const fs=require("fs");
const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const session = require('express-session');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const app = express();
const HEADERS = require("headers");
const PORT = 1337;
const DBNAME = "social";
const TTL=10; //espresso in secondi
const NO_COOKIES="No cookies found";
const CONNECTIONSTRING="mongodb+srv://tagaru_mgmt:pa55word@socialcluster.f3sp6.mongodb.net/social?retryWrites=true&w=majority";
const CONNECTIONOPTIONS = {useNewUrlParser: true, useUnifiedTopology: true};

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

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/static/pages/register/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

const crypto = require('crypto');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

app.post('/register', (req, res) => {
    const { propic, username, nome, cognome, sesso, dataNascita, email, password, numTel, admin } = req.body;

    // Check if user with the same email is also registered
    if (users.find(user => user.email === email)) {

        res.render('register', {
            message: 'User already registered.',
            messageClass: 'alert-danger'
        });

        return;
    }

    const hashedPassword = getHashedPassword(password);

    // Store user into the database if you are using one
    users.push({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    res.render('login', {
        message: 'Registration Complete. Please login to continue.',
        messageClass: 'alert-success'
    });
});

app.post('/registerComplete', function(req, res, next) {
    mongoClient.connect(CONNECTIONSTRING, CONNECTIONOPTIONS, function(err, client) {
        let propic=
        if (err)
            res.status(503).send("Errore di connessione al database");
        else {
            const db = client.db(DBNAME);
            const collection = db.collection("accounts");

            let email = req.body.email;
            collection.insert
            
        }
    });
});

app.post('/login', function(req, res, next) {
    mongoClient.connect(CONNECTIONSTRING, CONNECTIONOPTIONS, function(err, client) {
        if (err)
            res.status(503).send("Errore di connessione al database");
        else {
            const db = client.db(DBNAME);
            const collection = db.collection("accounts");

            let email = req.body.email;
            collection.findOne({ "email": email }, function(err, dbUser) {
                if (err)
                    res.status(500).send("Internal Error in Query Execution");
                else {
                    if (dbUser == null)
                        res.status(401).send("Email o Password non validi");
                    else {
                        //req.body.password --> password in chiaro inserita dall'utente
                        //dbUser.password   --> password cifrata contenuta nel DB
                        //Il metodo compare() cifra req.body.password e la va a confrontare con dbUser.password
                        bcrypt.compare(req.body.pass, dbUser.password, function(err, ok) {
                            if (err)
                                res.status(500).send("Internal Error in bcrypt compare");
                            else {
                                if (!ok)
                                    res.status(401).send("Email o Password non validi");
                                else {
                                    let token = createToken(dbUser);                                  
                                    writeCookie(res, token);
                                    console.log("token: "+token)
                                    res.send({ "ris": "ok" });
                                }
                            }
                        });
                    }
                }
                client.close();
            })
        }
    });
});



/*app.post('/login', (req, res) => {
    // Insert Login Code Here
    let email = req.body.email;
    let password = req.body.pass;
    res.send(`Username: ${username} Password: ${password}`);
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});*/