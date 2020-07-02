const express = require('express')
const passport = require('passport')
const router = express.Router()

const PlantCollection = require('./../models/plantCollection')

const customErrors = require('./../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

// GET all plant collections
router.get('/plantCollections', requireToken, (req, res, next) => {
  PlantCollection.find({'owner': req.user.id})
    .populate('plantCollections')
    .then(plantCollections => {
      return plantCollections.map(plantCollection => plantCollection.toObject())
    })
    .then(plantCollections => res.status(200).json({plantCollections: plantCollections}))
    .catch(next)
})

// SHOW one plant collection
router.get('/plantCollections/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  PlantCollection.findById(id)
    .then(handle404)
    .then(plantCollection => res.status(200).json({plantCollection: plantCollection.toObject()}))
    .catch(next)
})

// CREATE new plant collection
router.post('/plantCollections', requireToken, (req, res, next) => {
  req.body.plantCollection.owner = req.user.id
  const plantCollectionData = req.body.plantCollection

  PlantCollection.create(plantCollectionData)
    .then(plantCollection => res.status(201).json({plantCollection: plantCollection.toObject()}))
    .catch(next)
})

// UPDATE plant collection
router.patch('/plantCollections/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.plantCollection.owner
  const id = req.params.id
  const plantCollectionData = req.body.plantCollection

  PlantCollection.findById(id)
    .then(handle404)
    .then(plantCollection => {
      requireOwnership(req, plantCollection)
      return plantCollection.updateOne(plantCollectionData)
    })
    .then(plantCollection => res.status(200).json({plantCollection: plantCollection}))
    .catch(next)
})

// DELETE plant collection
router.delete('/plantCollections/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  PlantCollection.findById(id)
    .then(handle404)
    .then(plantCollection => {
      requireOwnership(req, plantCollection)
      plantCollection.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
