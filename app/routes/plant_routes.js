const express = require('express')
const router = express.Router()

const User = require('./../models/user')
const handle404 = require('./../../lib/custom_errors')

// GET all plants
router.get('/plants', (req, res, next) => {
  User.find()
    .populate('plants')
    .then(plants =>
      res.json({plants: plants}))
    .catch(next)
})

// CREATE new plant info
router.post('/plants', (req, res, next) => {
  // Make variable for plant data
  const plantData = req.body.plant
  // Make variable for user Id
  const userId = plantData.userId
  // Find sser by id
  User.findById(userId)
    // if successful pass userId
    .then(handle404)
    .then((user) => {
      // push plant data into user's plant property
      user.plants.push(plantData)
      // save user's plant data
      return user.save()
    })
    .then(user => res.json({user: user}))
    .catch(next)
})

// UPDATE plant info
router.patch('/plants/:id', (req, res, next) => {
  const plantId = req.params.id
  const plantData = req.body.plant
  const userId = plantData.userId

  User.findById(userId)
    .then(handle404)
    .then(user => {
      user.plants.id(plantId).set(plantData)
      return user.save()
    })
    .then(user => res.status(200).json({user: user}))
    .catch(next)
})

// DELETE plant info
router.delete('/plants/:id', (req, res, next) => {
  const plantId = req.params.id
  const plantData = req.body.plant
  const userId = plantData.userId

  User.findById(userId)
    .then(handle404)
    .then(user => {
      user.plants.id(plantId).remove()
      return user.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
