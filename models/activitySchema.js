const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    userID: {type: String, require:true, unique:true},
    messagessent: {type: Number, default:0},
    numberRoles:{ type: Number, default: 0}
})


const model = mongoose.model('ActivityModels', activitySchema)

module.exports = model;