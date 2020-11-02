const mongoose = require('mongoose')

const artistSchema = mongoose.Schema({
  name: String,
  label: String,
  image: String,
  description: String,
  notable_songs: Array
})

module.exports = mongoose.model('Artist', artistSchema)
