const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  entry: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plantCollection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlantCollection',
    required: true
  }
}, {
  timestamps: true
})

module.exports = logSchema
