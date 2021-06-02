const mongoose = require('mongoose')

const Activity = new mongoose.Schema({
    userID: {type: String, require:true, unique:true},
    username: {type: String, require:true, unique:false},
    messagesSent: {type: Number, default:0},
    dateJoined: {type: Date},
    roles:{ type: Number, default: 0}
})


const model = mongoose.model('activity', Activity);
module.exports = model;