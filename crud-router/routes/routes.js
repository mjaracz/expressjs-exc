const express = require('express')

const Document = require('../models/Documents')
const router = express.Router()

router.get('/documents/all', (req, res, next) => {
  req.app.locals.db.collection('example').find({}).toArray((err, result) => {
    if(err) return res.status(400).send({'error': err})
    if(result === undefined || result.length === 0) return res.status(400).send({'error':'No docs in DB'})
    res.status(200).send(result)
  })
})

router.get('/documents/:id', (req, res, next) => {
  req.app.locals.db.collection('documents').findOne({
    '_id': req.params.id
  }, (err, result) => {
    if(err) return res.status(400).send({'error': err })
    if (result === undefined) return res.status(400).send({'error': 'No document in this id, was found'})
    
    res.status(200).send(result)
  })
})

router.post('/documents/new', (req, res, next) => {
  const newDoc = new Document(req.body.title, req.body.username, req.body.body)
  req.app.locals.db.collection('documents').insertOne({
    newDoc
  }, (err, result) => {
    if(err) return res.status(400).send({'error': err});
    res.status(200).send(result)
  })
})

router.delete('/documents/delete/:id', (req, res, next) => {
  req.app.locals.db.collection('documents').deleteOne({
    '_id': req.params.id
  }, (err, result) => {
    if(err) return res.status(400).send({'error': err})
    res.status(200).send(result)
  })
})

router.patch('/documents/edit/:id', (req, res, next) => {
  req.app.locals.db.collection('documents').updateOne({
    '_id': req.params.id
  },
  {$set:
    {
      title: req.body.title,
      username: req.body.username,
      body: req.body.body
    }
  }, (err, result) => {
    if(err) return res.status(400).send({'error': err})
    res.status(200).send(result)
  })
})

module.exports = router
