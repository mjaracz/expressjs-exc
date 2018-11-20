const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const routes = require('./routes/routes.js')


const url = `mongodb://test:test123@cluster0-shard-00-00-kx74d.mongodb.net:27017,cluster0-shard-00-01-kx74d.mongodb.net:27017,
cluster0-shard-00-02-kx74d.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
const options = {
  useNewUrlParser: true,
  reconnectTries: 60,
  reconnectInterval: 1000
}


const port = process.env.PORT || 8080
const app = express()
const http = require('http').Server(app)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', routes)
app.use((req, res) => {
  res.status(404)
})


MongoClient.connect(url, options, (err, database) => {
  if(err) {
    console.log(`Fatal mongodb connection error: ${err}: ${err.stack}`)
    process.exit(1)
  }
  else {
    app.locals.db = database.db('test')
    http.listen(port, () => {
      console.log('Listen on port' + port)
      // app.emit('APP_STARTED')
    })
  }
})

module.exports = app