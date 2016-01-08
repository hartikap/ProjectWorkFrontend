var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/27017/cvdb', function(err) {
    if(err) {
        console.log('connection error', err.message);
    } else {
        console.log('connection successful');
    }
});

var userSchema = new mongoose.Schema({
  username: {type:String, unique:true},
  password: String,
});

var presetSchema = new mongoose.Schema({
    presetname: String,
    cv1: Number,
    cv2: Number,
    cv3: Number,
    cv4: Number,
    cv5: Number,
    cv6: Number,
    cv7: Number,
    cv8: Number,
    userid: {type:mongoose.Schema.ObjectId,ref:'userSchema'},
});


exports.users = mongoose.model('users', userSchema);
exports.presets = mongoose.model('presets', presetSchema);