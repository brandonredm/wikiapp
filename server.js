const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config()

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI
app.use(express.json())

app.use(cors());
console.log(MONGODB_URI);
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('the connection with mongod is established at', MONGODB_URI)
  }
)

// Optional, but likely helpful
// Connection Error/Success
// Define callback functions for various events
mongoose.connection.on('error', err => console.log(err.message + ' is mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

const artistsController = require('./controllers/artist_controller.js')
app.use('/api/artists', artistsController)

// app.get('/', (req, res) => {
//     res.redirect('/artists');
// });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


//local port is 5000
app.listen(PORT, () => {
    console.log('listening');
});
