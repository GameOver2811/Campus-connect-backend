// Import Starts here
const connectDatabase = require('./db');
const express = require('express');

// Import Ends here

// Connecting with database
const serverResponse = connectDatabase();

// Setting up express
const app = express();
const port = 3001


// End Points for Database
app.use(express.json()); // Add this line to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded requests
app.get('/', (req, res) => {
  res.send('This is Campus-Connect-Backend')
})

app.use('/api/auth', require('./Routes/userAuth'));

app.listen(port, () => {
  console.log(`CampusConnect listening on port ${port}`) 
})