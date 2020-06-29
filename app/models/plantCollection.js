const mongoose = require('mongoose')

const plantSchema = require('./plant')

const plantCollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  plants: [plantSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('PlantCollection', plantCollectionSchema)
