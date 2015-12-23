var db = require('./database');

exports.saveNewUser = function (req,res) {
    
    var userTemp = new db.users(req.body);
    //Save it to database
    personTemp.save(function(err,ok){
        
        db.Friends.update({username:req.session.kayttaja},
                          {$push:{'friends':personTemp._id}},
                          function(err,model){
            
            //console.log("SEND REDIRECT!!!!!");
            //Make a redirect to root context
            //res.redirect(301,'/persons.html');
            res.send("Added stuff");
        });
     
    });
    
}

// This function finds all presets for certain user
exports.getPresetsByUsername = function (req,res) {
    
    console.log("getPresetsByUsername requested");
    res.send("not yet ready");
    
}