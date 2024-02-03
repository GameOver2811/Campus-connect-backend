const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName : {
        type : String,
        required : true
    },
    name : {
        type : String
    },
    phone : {
        type : Number,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    position : {
        type : String,
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Company', companySchema);