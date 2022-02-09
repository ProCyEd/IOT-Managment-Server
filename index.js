const checkAvailable = require('./boxReservation')

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

function middleware(req, res, next) {
  console.log(req.cookies)
  next()
}

app.post('/api/reservation', middleware, (req, res) => {

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