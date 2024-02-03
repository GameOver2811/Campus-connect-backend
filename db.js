// Import - Start here
const mongoose = require("mongoose");

// Import - Ends here

// Database URL
const DATABASE_URL = "mongodb://localhost:27017/campus-connect";


// Function to connect with database
const connectDatabase = () => {
    mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log("Connected to the database"); 
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
}

// Exporting Module
module.exports =  connectDatabase;