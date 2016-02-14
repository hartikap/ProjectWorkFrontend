// This is a router file for /presets resource

var query = require('./queries');

var express = require("express");
var router = express.Router();



// Router to get all presets for user
router.post('/getpresets', function(req,res) {
    
    query.getPresetsByUsername(req,res);
    
});


// Router for preloading preset-objects for following routes (get, post, put, delete)
router.param('preset', function(req, res, next) {
   
    query.getOnePreset(req,res, next);
    
});


// Router to get preset based on id
router.get('/user/:preset', function(req,res) {
    res.json(req.preset);
    
});

// Router for saving new preset
router.post('/', function(req,res,next) {
    console.log("post request for presets")
    query.saveNewPreset(req,res,next);
    
});



// USERS-----------------------------------------------------

// Router for saving new user
router.post('/register/', function(req,res) {
    query.saveNewUser(req,res); 
});

// Router for saving new user
router.post('/login/', function(req,res) {
    query.loginUser(req,res); 
});


//router.put('')

module.exports = router;