const mongoose = require('mongoose')

const plantSchema = require('./plant')

const plantCollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  plants: [plantSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('PlantCollection', plantCollectionSchema)
