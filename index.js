var express = require('express');
var app = express();
var path = require("path");
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var used_port = 8081;
var dbrouter = require('./database/dbrouter');

//Bodyparser json() middleware parses the json object
//from HTTP POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use('/',express.static(path.join(__dirname, 'Views')));
app.use('/css',express.static(path.join(__dirname, 'css')));
app.use('/controllers',express.static(path.join(__dirname, 'controllers')));
app.use('/node_modules',express.static(path.join(__dirname, 'node_modules')));
app.use('/lib',express.static(path.join(__dirname, 'lib')));
app.use('/Modules',express.static(path.join(__dirname, 'Modules')));
app.use('/factories',express.static(path.join(__dirname, 'factories')));
app.use('/database',express.static(path.join(__dirname, 'database')));


app.use('/presets', dbrouter);


// ROUTERS---------------------------------------------




var server = app.listen(used_port, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at port " + port);

})