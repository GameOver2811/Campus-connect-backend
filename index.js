// Import Starts here
const connectDatabase = require('./db');
const express = require('express');

// Import Ends here

// Connecting with database
connectDatabase();

// Setting up express
const app = express();
const port = 3001


// End Points for Database

app.get('/', (req, res) => {
  res.send('This is Campus-Connect-Backend')
})

app.listen(port, () => {
  console.log(`CampusConnect listening on port ${port}`)
})