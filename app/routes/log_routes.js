const express = require('express')
const passport = require('passport')
const router = express.Router()

const PlantCollection = require('./../models/plantCollection')

const customErrors = require('./../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

// GET all plant info
// router.get('/plants', requireToken, (req, res, next) => {
//   PlantCollection.find({'owner': req.user.id})
//     .populate('plants')
//     .then(plants => {
//       return plants.map(plant => plant.toObject())
//     })
//     .then(plants => res.status(200).json({ plantCollection: plants }))
//     .catch(next)
// })

// SHOW a plant info
router.get('/plantCollections/:plantCollectionId/plants/:plantId/logs/:logId', requireToken, (req, res, next) => {
  const plantCollectionId = req.params.plantCollectionId
  // const plantId = req.params.plantId
  const logId = req.params.logId
  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      let log = plantCollection.plants.logs.id(logId)
      log = handle404(log)
      res.status(200).json({log: log})
    })
    .catch(next)
})

// CREATE new plant info
router.post('/logs', requireToken, (req, res, next) => {
  req.body.log.owner = req.user.id
  const logData = req.body.log
  const plantCollectionId = logData.plantCollectionId

  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      plantCollection.plants.logs.push(logData)
      return plantCollection.save()
    })
    .then(plantCollection => res.status(201).json({plantCollection: plantCollection}))
    .catch(next)
})

// UPDATE plant info
router.patch('/plantCollections/:plantCollectionId/plants/:plantId/logs/:logId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.log.owner
  const logId = req.params.logId
  const logData = req.body.log
  const plantCollectionId = req.params.plantCollectionId

  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      requireOwnership(req, plantCollection)
      plantCollection.plants.logs.id(logId).set(logData)
      return plantCollection.save()
    })
    .then(plantCollection => res.status(200).json({plantCollection: plantCollection}))
    .catch(next)
})

// DELETE plant info
router.delete('/logs/:id', requireToken, (req, res, next) => {
  const logId = req.params.id
  const logData = req.body.log
  const plantCollectionId = logData.plantCollectionId

  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      requireOwnership(req, plantCollection)
      plantCollection.plants.logs.id(logId).remove()
      return plantCollection.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
