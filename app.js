const express = require('express');
const path = require('path');

const PORT = 8000;
var app = express();

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
app.get('/css/index.css', function(req, res){
    res.sendFile(path.join(__dirname + '/src/styles/index.css'));
});

//Start Server
app.listen(process.env.PORT||PORT, function(){
    console.log('Listening on port ' + PORT);
});
