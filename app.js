const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

//AWS libraries
const AWS = require('aws-sdk');
// const S3 = new AWS.S3
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
app.use(express.static(path.join(__dirname, '/src/')));

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

//Register an account on AWS Cognito
app.post('/register', function(req, res){
    console.log('Creating Account\nUsername:', req.body.username,'\nPassword:', req.body.password);
    registerUser({username: req.body.username, password: req.body.password}).then(function(user){
        console.log('Account Created:', user.getUsername());
        res.json({success:true, username: user.getUsername()});
    }).catch(function(err){
        if(err.code == 'UsernameExistsException') {
            res.json({success:false, reason:'That email has already been registered'});
        }
        else if(err.code == 'InvalidParameterException') {
            res.json({success:false, reason:'Password does not meet security requirements'});
        }
        else {
            console.log('Error Creating Account', err);
            res.statusMessage = 'Error Creating Account';
            res.sendStatus(500);
        }
    });
});

//Confirm that the email is valid
app.post('/confirm', function(req, res){
    console.log('Confirming Account\nUsername:', req.body.username, '\nConfirmation Code', req.body.conf_code);
    confirm(req.body.username, req.body.conf_code).then(function(result){
        res.redirect('/view');
    }).catch(function(err){
        console.log('Error confirming account:', err);
        res.json({error: 'Error Confirming Account'});
    });
});

//Verify the users credentials
app.get('/verify', function(req, res){
    console.log('Verifying Credentials\nUsername:', req.query.username, '\nPassword:', req.query.password);
    login(req.query.username, req.query.password).then(function(tokens){
        console.log(tokens);
        res.redirect('/view');
    }).catch(function(err){
        console.log(err.code);
    });
});

function registerUser(params) {
    return new Promise(function(resolve, reject){
        var attributeList = []
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name: "email", Value: params.username}));
        // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name: "solved", Value: 0}));
    
        userPool.signUp(params.username, params.password, attributeList, null, function(err, result){
            if(err) {
                console.log('Error creating account', err);
                reject(err);
            }
            else {
                user = result.user;
                resolve(user);
            }
        });
    });
}

function confirm(username, code) {
    return new Promise(function(resolve, reject){
        var userData = {
            Username : username,
            Pool : userPool
        };
        var user = new AmazonCognitoIdentity.CognitoUser(userData);
        user.confirmRegistration(code, true, function(err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

function login(username, password) {
    return new Promise(function(resolve, reject){
        var authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: username,
            Password: password
        });
    
        var userData = {
            Username: username,
            Pool: userPool
        }
        var user = new AmazonCognitoIdentity.CognitoUser(userData);
        user.authenticateUser(authDetails, {
            onSuccess: function(result) {
                resolve({
                    access_token: result.getAccessToken().getJwtToken(),
                    id_token: result.getIdToken().getJwtToken(),
                    refresh_token: result.getRefreshToken().getToken()
                });
            },
            onFailure: function(err) {
                console.log('Error logging in', err);
                reject(err);
            }
        });
    });
}


//Start Server
app.listen(process.env.PORT||PORT, function(){
    console.log('Listening on port ' + PORT);
});
