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
                res.send(200,{status:"Ok"});
            }
            else{
                res.send(401,{status:"Wrong username or password"});
            }
            
        }
        
    });
    
}


// This function saves a new preset
exports.saveNewPreset = function (req,res) {
    
    console.log(req.body);

    
    var preset = new db.presets(req.body);

    preset.save(function(err, preset){
        if(err){ return next(err); }

    res.json(preset);
    });
    
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

