const express = require('express')
const router = express.Router()

const PlantCollection = require('./../models/plantCollection')
const handle404 = require('./../../lib/custom_errors')
// const Plant = require('./../models/plant')

// GET all plants
router.get('/plants', (req, res, next) => {
  PlantCollection.find()
    .populate('plants')
    .then(plants =>
      res.json({plants: plants}))
    .catch(next)
})

// CREATE new plant info
router.post('/plants', (req, res, next) => {
  const plantData = req.body.plant
  const plantCollectionId = plantData.plantCollectionId
  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then((plantCollection) => {
      plantCollection.plants.push(plantData)
      return plantCollection.save()
    })
    .then(plantCollection => res.json({plantCollection: plantCollection}))
    .catch(next)
})

// UPDATE plant info
router.patch('/plants/:id', (req, res, next) => {
  const plantId = req.params.id
  const plantData = req.body.plant
  const plantCollectionId = plantData.plantCollectionId

  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      plantCollection.plants.id(plantId).set(plantData)
      return plantCollection.save()
    })
    .then(plantCollection => res.status(200).json({plantCollection: plantCollection}))
    .catch(next)
})

// DELETE plant info
router.delete('/plants/:id', (req, res, next) => {
  const plantId = req.params.id
  const plantData = req.body.plant
  const plantCollectionId = plantData.plantCollectionId

  PlantCollection.findById(plantCollectionId)
    .then(handle404)
    .then(plantCollection => {
      plantCollection.plants.id(plantId).remove()
      return plantCollection.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
