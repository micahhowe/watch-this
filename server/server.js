require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const authCtrl = require('./authController')
const flixCtrl = require('./flixController')



const app = express()
//Make sure that your middleware (app.use) is above the endpoints so they can run first
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 10
    }
  }))
  //authController
  app.post('/auth/register', authCtrl.register)
  app.post('/auth/login', authCtrl.login)
  app.get('/auth/logout', authCtrl.logout)
  app.get('/auth/me', authCtrl.sessionInfo)

  //flixController
  app.get('/api/flix', flixCtrl.findFlix)
  app.post('/api/flix', flixCtrl.createFlix)
  app.delete('/api/flix/:id', flixCtrl.deleteFlix)
  app.put('/api/flix/:id', flixCtrl.updateFlix)


 

massive(CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance)
  app.listen(SERVER_PORT, () => console.log(`NSA is listening on ${SERVER_PORT}`))
})