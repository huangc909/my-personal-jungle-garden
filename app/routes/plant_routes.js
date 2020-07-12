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

router.get('/plantCollections/:plantCollectionId/plants', requireToken, (req, res, next) => {
  const plantCollectionId = req.params.plantCollectionId

  PlantCollection.findById(plantCollectionId)
    .populate('plants')
    .then(plants => {
      return plants.map(plant => plant.toObject())
    })
    .then(plants => res.status(200).json({plants: plants}))
    .catch(next)
})

// GET one plant info

router.get('/plantCollections/:plantCollectionId/plants/:plantId', requireToken, (req, res, next) => {
  const plantCollectionId = req.params.plantCollectionId
  const plantId = req.params.plantId
  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      let plant = plantCollection.plants.id(plantId)
      plant = handle404(plant)
      res.status(200).json({plant: plant})
    })
    .catch(next)
})

// CREATE new plant info
router.post('/plants', requireToken, (req, res, next) => {
  req.body.plant.owner = req.user.id
  const plantData = req.body.plant
  const plantCollectionId = plantData.plantCollectionId

  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      plantCollection.plants.push(plantData)
      return plantCollection.save()
    })
    .then(plantCollection => res.status(201).json({plantCollection: plantCollection}))
    .catch(next)
})

// UPDATE plant info
router.patch('/plantCollections/:plantCollectionId/plants/:plantId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.plant.owner

  const plantId = req.params.plantId
  const plantData = req.body.plant
  const plantCollectionId = req.params.plantCollectionId

  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      requireOwnership(req, plantCollection)
      plantCollection.plants.id(plantId).set(plantData)
      return plantCollection.save()
    })
    .then(plantCollection => res.status(200).json({plantCollection: plantCollection}))
    .catch(next)
})

// DELETE plant info
router.delete('/plants/:id', requireToken, (req, res, next) => {
  const plantId = req.params.id
  const plantData = req.body.plant
  const plantCollectionId = plantData.plantCollectionId

  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      requireOwnership(req, plantCollection)
      plantCollection.plants.id(plantId).remove()
      return plantCollection.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
