const express = require('express')
const passport = require('passport')
const router = express.Router()

const PlantCollection = require('./../models/plantCollection')

const customErrors = require('./../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

// SHOW a log info
router.get('/plantCollections/:plantCollectionId/plants/:plantId/logs/:logId', requireToken, (req, res, next) => {
  const logId = req.params.logId
  const plantId = req.params.plantId
  const plantCollectionId = req.params.plantCollectionId

  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      let log = plantCollection.plants.id(plantId).logs.id(logId)
      log = handle404(log)
      res.status(200).json({log: log})
    })
    .catch(next)
})

// CREATE new log info
router.post('/plantCollections/:plantCollectionId/plants/:plantId/logs', requireToken, (req, res, next) => {
  req.body.log.owner = req.user.id
  const logData = req.body.log
  const plantCollectionId = req.params.plantCollectionId
  const plantId = req.params.plantId
  // Find specific plant collection by id
  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    // Then find specific plant by id
    .then(plantCollection => {
      plantCollection.plants.id(plantId).logs.push(logData)
      return plantCollection.save()
    })
    .then(plantCollection => res.status(201).json({plantCollection: plantCollection}))
    .catch(next)
})

// UPDATE log info
router.patch('/plantCollections/:plantCollectionId/plants/:plantId/logs/:logId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.log.owner
  const logId = req.params.logId
  const plantId = req.params.plantId
  const plantCollectionId = req.params.plantCollectionId
  const logData = req.body.log

  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      requireOwnership(req, plantCollection)
      plantCollection.plants.id(plantId).logs.id(logId).set(logData)
      return plantCollection.save()
    })
    .then(plantCollection => res.status(200).json({plantCollection: plantCollection}))
    .catch(next)
})

// DELETE log info
router.delete('/plantCollections/:plantCollectionId/plants/:plantId/logs/:logId', requireToken, (req, res, next) => {
  const logId = req.params.logId
  const plantId = req.params.plantId
  const plantCollectionId = req.params.plantCollectionId

  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      requireOwnership(req, plantCollection)
      plantCollection.plants.id(plantId).logs.id(logId).remove()
      return plantCollection.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
