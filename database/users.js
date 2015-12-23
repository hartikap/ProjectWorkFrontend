// This is a router file for /user resource

var query = require('./queries');

var express = require("express");
var router = express.Router();

router.get('/', function(req,res) {
    
    query.getPresetsByUsername(req,res);
    
});

module.exports = router;