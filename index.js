const checkAvailable = require('./boxReservation')

const express = require('express')
var bodyParser = require('body-parser')
const cookie = require('cookie')
const app = express()
const port = 3001

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/reservation', (req, res) => {

  console.log("Incoming")

    checkAvailable(req.body, (token) => {
      if(token != null) {
        res.setHeader("Set-Cookie", cookie.serialize("token", token, {
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