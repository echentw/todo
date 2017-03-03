var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  facebookId: {type: String, required: true, index: {unique: true}},
  name: {type: String, required: true},
});

var User = mongoose.model('User', userSchema);

module.exports = User;
