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
    cv1: Array,
    cv2: Array,
    cv3: Array,
    cv4: Array,
    cv5: Array,
    cv6: Array,
    cv7: Array,
    cv8: Array,
    userid: {type:mongoose.Schema.ObjectId,ref:'userSchema'},
});


exports.users = mongoose.model('users', userSchema);
exports.presets = mongoose.model('presets', presetSchema);