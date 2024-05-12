const express = require('express')
const bodyParser = require('body-parser')
const dbHandler = require('./modules/dbHandler')
const tokenHandler = require('./modules/tokenHandler')
const sessionApi = require('./apis/sessionApi')
const constants = require('./contants')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dbHandler.startConnection();

app.get('/health', (req, res) => {
  let check = dbHandler.checkHealth()
  res.status(check['status']).send(check)
})

app.get('/auth', (req, res) => {
  var body = req.body;
  if (body.session) {
    sessionApi.getUserSession(body.session).then(session => { 
      if (session.msg == "not found")
        res.status(403).send({
          msg: session.msg
        })
      else {
        res.status(200).send(session)
      }
    }).catch(err => { 
      res.status(500).send(err)
    })
  } else {
    dbHandler.authUser({
      username: body.username,
      password: body.password
    }).then(response => {
      token = tokenHandler.createSessionToken(body.username.concat(body.password))
      return sessionApi.putUserSession(body.username.concat(body.password), {})
    }).then(session => { 
      res.status(201).send(session)
    }).catch(err => {
      res.status(403).send(err)
    })
  }
})

app.listen(constants.APP_PORT, () => {
  console.log(`Example app listening on port ${constants.APP_PORT}`)
})

