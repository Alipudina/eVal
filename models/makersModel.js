const mongoose = require('mongoose');

const makerSchema = new mongoose.Schema({
  userName: {type: String, required: true, unique:true},
  password: {type: String, required: true}
}, {versionKey: false})

const makersModel = mongoose.model('makerProfiles', makerSchema);

module.exports = makersModel;
