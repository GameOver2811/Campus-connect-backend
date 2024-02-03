const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    collegeName : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : Number,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('College', collegeSchema);