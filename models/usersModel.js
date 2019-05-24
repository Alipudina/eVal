const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userEmail: {type: String, required: true, unique:true},
  userName: {type: String, required: true},
  password: {type: String, required: true}
}, {versionKey: false})

const usersModel = mongoose.model('userProfiles', userSchema);

module.exports = usersModel;
