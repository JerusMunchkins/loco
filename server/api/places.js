const router = require('express').Router()
const {Place} = require('../db/models')
module.exports = router

// POST places
router.post('/', async (req, res, next) => {
  const {name, locationId} = req.body
  try {
    const place = await Place.create({name, locationId})
    res.json(place)
  } catch (err) {
    next(err)
  }
})

router.put('/:placeId', async (req, res, next) => {
  const {locationId, name} = req.body
  const {placeId} = req.params
  const payload = locationId ? {locationId, name} : {name}

  try {
    await Place.update(payload, {where: {id: placeId}})
    res.json(204).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:placeId', async (req, res, next) => {
  const {placeId} = req.params

  try {
    await Place.destroy({
      where: {id: placeId}
    })
    res.status(202).end()
  } catch (err) {
    next(err)
  }
})
