const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

//AWS libraries
const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const config = require('./aws-config.json');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');


//Setting up express app
const PORT = 8000;
var app = express();
app.use(bodyParser.urlencoded({extended:true}));

//AWS Cognito SetUp
const poolData = {
    UserPoolId: config.user_pool_id,
    ClientId: config.client_id
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//Login Page
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

//View Coding Problems page
app.get('/view', function(req, res){
    res.sendFile(path.join(__dirname + '/src/view.html'));
});

//Solve a coding problem page 
app.get('/code', function(req, res){
    res.sendFile(path.join(__dirname + '/src/code.html'));
});

//Create a coding problem page
app.get('/create', function(req, res){
    res.sendFile(path.join(__dirname + '/src/create.html'));
});

//Basic scripts
app.get('/scripts/index.js', function(req, res){
    res.sendFile(path.join(__dirname + '/src/scripts/index.js'));
});

//Styling
app.get('/styles/index.css', function(req, res){
    res.sendFile(path.join(__dirname + '/src/styles/index.css'));
});

//
app.post('/register', function(req, res){
    console.log(req.body.username);
    console.log(req.body.password);
    res.redirect('/view')
});

function registerUser() {
    var attributeList = []
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name: "email", Value: "aditeshk@uci.edu"}));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name: "solved", Value: 0}));

    userPool.signUp('aditeshk@uci.edu', 'Y33tcode!', attributeList, null, function(err, result){
        if(err) {
            console.log('Error creating account', err);
            return;
        }
        user = result.user;
        console.log('username is ' + user.getUsername());
    });
}
// registerUser();

function confirm(pin) {
    var userData = {
        Username : 'aditeshk@uci.edu',
        Pool : userPool
    };
    var user = new AmazonCognitoIdentity.CognitoUser(userData);
    user.confirmRegistration(pin, true, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('call result: ' + result);
    });
}
// confirm('387198');

function login() {
    var authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: 'aditeshk@uci.edu',
        Password: 'Y33tcode!'
    });

    var userData = {
        Username: 'aditeshk@uci.edu',
        Pool: userPool
    }
    var user = new AmazonCognitoIdentity.CognitoUser(userData);
    user.authenticateUser(authDetails, {
        onSuccess: function(result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());
        },
        onFailure: function(err) {
            console.log('Error logging in', err);
        }
    });
}
// login();


//Start Server
app.listen(process.env.PORT||PORT, function(){
    console.log('Listening on port ' + PORT);
});
