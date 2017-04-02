const mongoose = require('mongoose');

const task = new mongoose.Schema({
  value: {type: String, required: true},
  checked: {type: Boolean, required: true},
});

const userSchema = new mongoose.Schema({
  facebookId: {type: String, required: true, index: {unique: true}},
  name: {type: String, required: true},
  tasks: [task],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
