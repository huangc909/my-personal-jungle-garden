const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  entry: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = logSchema
