const express = require('express')
const router = express.Router()

const PlantCollection = require('./../models/plantCollection')
const handle404 = require('./../../lib/custom_errors')
// const Plant = require('./../models/plant')

// GET all plant collections
router.get('/plantCollections', (req, res, next) => {
  PlantCollection.find()
    .then(plantCollections =>
      res.json({plantCollections: plantCollections}))
    .catch(next)
})

// CREATE new plant collection
router.post('/plantCollections', (req, res, next) => {
  const plantCollectionData = req.body.plantCollection
  PlantCollection.create(plantCollectionData)
    .then(plantCollection => res.status(201).json({plantCollection: plantCollection}))
    .catch(next)
})

// UPDATE plant collection
router.patch('/plantCollections/:id', (req, res, next) => {
  const id = req.params.id
  const plantCollectionData = req.body.plantCollection

  PlantCollection.findById(id)
    .then(handle404)
    .then(plantCollection => plantCollection.updateOne(plantCollectionData))
    .then(plantCollection => res.status(200).json({plantCollection: plantCollection}))
    .catch(next)
})

// DELETE plant collection
router.delete('/plantCollections/:id', (req, res, next) => {
  const id = req.params.id

  PlantCollection.findById(id)
    .then(handle404)
    .then(plantCollection => plantCollection.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
