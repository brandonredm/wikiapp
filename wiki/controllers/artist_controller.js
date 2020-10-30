const express = require('express')

const artists = express.Router()


const Artist = require('../models/artist.js')


// CREATE

artists.post('/', (req, res) => {
  Artist.create(req.body, (error, createdArtist) => {
    if (error) {
      res.status(400).json({ error: error })
    }
    res.status(200).send(createdArtist)
  })
})

// READ

artists.get('/', (req, res) => {
  Artist.find({}, (error, foundArtists) => {
    if (error) {
      res.status(400).json({ error: error })
    }
    res.status(200).json(foundArtists)
  })
})

// UPDATE

artists.put('/:id', (req, res) => {
  Artist.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedArtist) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedArtist)
    }
  )
})

// DELETE

artists.delete('/:id', (req, res) => {

  Artist.findByIdAndRemove(req.params.id, (error, deletedArtist) => {
    if (error) {
      res.status(400).json({ error: error })
    }
    res.status(200).json(deletedArtist)
  })
})

artists.get('/*', (req, res) => {
  res.status(404).json({ error: 'page not found' })
})

module.exports = artists
