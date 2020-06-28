const express = require('express')
const router = express.Router()

const User = require('./../models/user')
const handle404 = require('./../../../lib/custom_errors')


router.post('/plants', (req, res, next) => {
  const plantData = req.body.plant

  const user
})
