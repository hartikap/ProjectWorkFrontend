var express = require('express');
var app = express();
var path = require("path");
var http = require('http').Server(app);
var used_port = 8081;


app.use('/',express.static(path.join(__dirname, 'Views')));
app.use('/css',express.static(path.join(__dirname, 'css')));
app.use('/controllers',express.static(path.join(__dirname, 'controllers')));
app.use('/node_modules',express.static(path.join(__dirname, 'node_modules')));
app.use('/lib',express.static(path.join(__dirname, 'lib')));
app.use('/Modules',express.static(path.join(__dirname, 'Modules')));
app.use('/factories',express.static(path.join(__dirname, 'factories')));


// ROUTERS---------------------------------------------

var server = app.listen(used_port, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at port " + port);

})