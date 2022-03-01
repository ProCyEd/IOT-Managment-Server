const createBoxReservation = require('./boxReservation')

const express = require('express')
var bodyParser = require('body-parser')
const cookie = require('cookie')
const app = express()
const port = 2000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/reservation', (req, res) => {
    console.log(req.body)
    const token = createBoxReservation(req.body)
    
    res.setHeader("Set-Cookie", cookie.serialize("token", token, {
        httpOnly: true,
        //secure: needs to be set to https only but in dev we dont have that
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/"
      }))
    res.status(200)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})