const express = require('express')
const bodyParser = require('body-parser')
const redisHandler = require('./modules/redisHandler')
const constants = require('./contants')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/session', (req, res) => {
  redisHandler.getSession(req.query.session).then(response => {
    res.status(200).send(response)
  }).catch(err => {
    res.status(500).send(err)
  })
})

app.put('/session', (req, res) => {
  var body = req.body
  redisHandler.putSession(body.key, JSON.stringify(body.data)).then(response => {
    res.status(201).send(response)
  }).catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
})

app.listen(constants.APP_PORT, () => {
  console.log(`Example app listening on port ${constants.APP_PORT}`)
})