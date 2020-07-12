const mongoose = require('mongoose')

const logSchema = require('./log')

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
  logs: [logSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = plantSchema
