var db = require('./database');


// Saves user to the database (when new user registers)
exports.saveNewUser = function (req,res) {
    
    var userTemp = new db.users(req.body);
    //Save it to database
    userTemp.save(function(err,userTemp){
        if(err) {res.status(500).send({status:err.message})}   
        res.json(userTemp);
    });
    
};
    
exports.loginUser = function (req,res) {
    
    var searchObject = {
        username:req.body.username,
        password:req.body.password
    }
    
    db.users.findOne(searchObject,function(err,data){
        
        if(err){
            
            res.send(502,{status:err.message});
            
        }else{
            console.log(data);
            //=< 0 means wrong username or password
            if(data){
                res.send(200,{status:"Ok", _id: data._id, dummy:"testing"});
            }
            else{
                res.send(401,{status:"Wrong username or password"});
            }
            
        }
        
    });
    
}


// This function saves a new voltage-preset to the database.
exports.saveNewPreset = function (req,res) {

    console.log("Searching for presetname in db: "+ req.body.presetname);
    db.presets.find({presetname: req.body.presetname,
                    userid: req.body.userid}, function (err, data) {
        
        if(data){
            if (!data.length) // Executes when presetname for current user is not found
            {
                console.log("Presetname not found, saving new preset for userid " +
                           req.body.userid);
                var preset = new db.presets(req.body);
                 preset.save(function(err, preset){
                     if(err){ return next(err); }
                     res.json(preset);
                 });    
            }
            else {
                console.log("Presetname used!");
                res.send(409,{status:"Presetname used!"});
            } 
            
        }
        if(err){
                res.send(500,{status:err.message});
        }
        
    });
    /*
    */
    
};

// This function finds all presets for user
exports.getPresetsByUsername = function (req,res) {
    

    db.presets.find({userid: req.body.userid}, function (err, data) {
        
        if(data){
                res.send(data);
            }
            else{
                
                res.redirect('/');
            }
        
    });
    
/*
    db.presets.findOne({userid:req.body.userid})
        .populate('useridk')
        .exec(function(err,data){
            
            if(data){
                console.log("aaafa");
                console.log(data);
                console.log("babab");
                console.log("aaafa");
                //console.log(data.presetarray);
                console.log("aaafa");
                res.send(data);
            }
            else{
                
                res.redirect('/');
            }
        
        });*/
    
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

