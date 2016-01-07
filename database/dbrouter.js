// This is a router file for /user resource

var query = require('./queries');

var express = require("express");
var router = express.Router();



// Router to get all presets for user
router.get('/', function(req,res) {
    
    query.getPresetsByUsername(req,res);
    
});


// Router for preloading preset-objects for following routes (get, post, put, delete)
router.param('preset', function(req, res, next, id) {
   
    query.getOnePreset(req,res,id);
    
});


// Router to get preset based on id
router.get('/user/:preset', function(req,res) {
    res.json(req.preset);
    
});

router.post('/', function(req,res,next) {
    query.saveNewPreset(req,res,next);
    
})

//router.put('')

module.exports = router;