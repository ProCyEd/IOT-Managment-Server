const checkAvailable = require('./boxReservation')
const publish = require('./rabbitMQ/publish')
const login = require('./auth/login')
const auth = require('./auth/authorization')

const express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
const cookie = require('cookie')
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  login(req, (token, mes) => {
    if(token != null) {
      res.setHeader("Set-Cookie", cookie.serialize("session", token, {
        httpOnly: true,
        //secure: needs to be set to https only but in dev we dont have that
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/"
      }))
      console.log("session issued")
      res.sendStatus(200)
    } else {
      res.sendStatus(403);
    }
  })
})

app.post('/logout', auth, (req, res) => {
  try {
    res.setHeader("Set-Cookie", cookie.serialize("session", "", {
      httpOnly: true,
      //secure: needs to be set to http only but in dev we dont have that
      expires: new Date(0),
      sameSite: "strict",
      path: "/"
    }))
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
 
})

app.post('/authenticate', auth, (req, res) => {
  res.send({verified: true})
})

app.post('/control/publish', auth, (req, res) => {
  publish(req.body.message, (response)=> {
    res.send(response);
  })
})

app.post('/api/reservation', auth, (req, res) => {

  console.log("Incoming")

    checkAvailable(req.body, (token) => {
      if(token != null) {
        res.setHeader("Set-Cookie", cookie.serialize("reservation", token, {
          httpOnly: true,
          //secure: needs to be set to https only but in dev we dont have that
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/"
        }))
        res.sendStatus(200)
      } else {
        res.sendStatus(403);
      }
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})