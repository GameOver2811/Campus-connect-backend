const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    collegeId : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        unique : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    collegeName : {
        type : String
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('User', userSchema);