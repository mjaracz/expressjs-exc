const asyncMiddleware  = require('../utils/asyncMiddleware')
const compareID = require('../utils/compareID')

const generateKey = require('../utils/generateKey')
const getArrID = require('../utils/getArrID')

const router = require('express').Router()

const JSONdb = require('node-json-db')
const db = new JSONdb('data', true, false)


router.get('/story/all', asyncMiddleware( async(req, res, next) => {
  const data = await db.getData('/')
  if(!data) return res.status(400).send('DB nie odpowiada na zapytanie')
  res.json(data)
}))


router.get('/story/:id', asyncMiddleware( async(req, res, next) => {
  const data = await db.getData('/data')
  compareID(req, data)
  
  let respons = await db.getData(`/data[${req.params.id}]`)
  res.json(respons)
}))


router.post('/story/new', asyncMiddleware( async(req, res, next) => {
  const data = await db.getData('/data')
  const arrID = getArrID(data, data.length)
  const key = generateKey(data, arrID)
  

  db.push(`/data[${data.length}]`, {
    "ID": key,
    "title": req.body.title,
    "username": req.body.username,
    "body": req.body.body
  }, true)

  const newDocument = await db.getData(`/data[${data.length - 1}]`)
  res.json(newDocument)
}))

router.put('/story/update/:id', asyncMiddleware( async(req, res, next) => {
  const data = await db.getData('/data')
  
  compareID(req, data)
  const arrID = getArrID(data, data.length)
  const key = generateKey(data, arrID)

  db.push(`/data[${req.params.id}]`, {
    "ID": key,
    "title": req.body.title,
    "username": req.body.username,
    "body": req.body.body
  }, true)
  
  const result = db.getData(`/data[${req.params.id}]`)
  res.json(result)
}))

router.delete(`/story/delete/:id`, asyncMiddleware( async(req, res, next) => {
  compareID(req, res, next)

  const result = await db.getData(`/data[${req.params.id}]`)
  db.delete(`/data[${req.params.id}]`)
  res.json(result)
}))


module.exports = router