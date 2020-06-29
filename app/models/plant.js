const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nickName: {
    type: String
  },
  dateAcquired: {
    type: String,
    required: true
  },
  additionalNotes: {
    type: String
  },
  log: {
    type: String,
    required: true
  },
  plantCollection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlantCollection'
  }
}, {
  timestamps: true
})

module.exports = plantSchema
