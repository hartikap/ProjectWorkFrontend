var db = require('./database');

exports.saveNewUser = function (req,res) {
    
    var userTemp = new db.users(req.body);
    //Save it to database
    personTemp.save(function(err,ok){
        
        db.users.update({username:req.session.kayttaja},
                          {$push:{'friends':personTemp._id}},
                          function(err,model){
            
            //console.log("SEND REDIRECT!!!!!");
            //Make a redirect to root context
            //res.redirect(301,'/persons.html');
            res.send("Added stuff");
        });
     
    });
    
}

exports.saveNewPreset = function (req,res) {
    
    var post = new db.presets(req.body);

    post.save(function(err, post){
        if(err){ return next(err); }

    res.json(post);
    });
    
};

// This function finds all presets (at the moment all the presets)
exports.getPresetsByUsername = function (req,res) {
    
    /*db.presets.find({''}, function(err,presets){
        if(err){return next(err); }
        res.json(presets);
        
    });*/
    
    // MIETI TÄMÄ LOPPUUN!!!
    db.presets.findOne({username:req.uid}).
        populate('presetarray').exec(function(err,data){
            
            if(data){
                res.send(data.presetarray);
            }
            else{
                
                res.redirect('/');
            }
        
        });
    
    
    console.log("getPresetsByUsername requested");
    
}

exports.getOnePreset = function (req,res, id) {
    var query = db.presets.findById(id);

    query.exec(function (err, post){
        if (err) { return next(err); }
        if (!post) { return next(new Error('can\'t find post')); }

        req.post = post;
        return next();
    });
    
    
}

