var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/8081/cvdb', function(err) {
    if(err) {
        console.log('connection error', err.message);
    } else {
        console.log('connection successful');
    }
});

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  presets: [{type:mongoose.Schema.Types.ObjectId,ref:'Person'}],
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
});


module.exports = mongoose.model('users', userSchema);
module.exports = mongoose.model('presets', presetSchema);