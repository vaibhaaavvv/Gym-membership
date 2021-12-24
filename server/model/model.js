const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone: Number,
    gender: String,
    membership: Number,
    membershipvalidupto:Date
})

const userdb = mongoose.model('memberdb', schema)

module.exports = userdb;