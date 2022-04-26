const checkAvailable = require('./boxReservation')
const publish = require('./rabbitMQ/publish')
const consume = require('./rabbitMQ/consume')
const login = require('./auth/login')
const auth = require('./auth/authorization')

const express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var path = require('path');
var cors = require('cors')
const cookie = require('cookie')
const app = express()
const port = 3001

const amqp = require('amqplib')

var channelPub = null;
var channelCon = null;

async function start() {
  const connectionPub = await amqp.connect("amqps://msdqunsz:8HfRRHR4k_1MnSrcSnL2dFadlDbYhsGJ@fish.rmq.cloudamqp.com/msdqunsz")
  channelPub = await connectionPub.createChannel();

  const connectionCon = await amqp.connect("amqps://msdqunsz:8HfRRHR4k_1MnSrcSnL2dFadlDbYhsGJ@fish.rmq.cloudamqp.com/msdqunsz")
  channelCon = await connectionCon.createChannel();
}

start()

app.use(bodyParser.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

const templateData = [
  {
      "id": 1,
      "name": "BoxOne",
      "router": "router1",
      "location": "location1",
      "description": "description1",
      "devices": [
          {
              "info": {
                  "title": "LightBulb",
                  "description": "Reprehenderit qui consectetur aute cupidatat velit commodo deserunt eu nulla eu. Nisi nulla enim aute et amet deserunt minim minim culpa. Proident cillum veniam velit sunt culpa laborum ullamco esse officia irure proident enim anim.",
              },
              "fields": [
                  {
                      "label": "name",
                      "value": "device1"
                  },
                  {
                      "label": "description",
                      "value": "description1"
                  },
                  {
                      "label": "ip",
                      "value": "ip1"
                  },
                  {
                      "label": "mac",
                      "value": "mac1"
                  },
                  {
                      "label": "vendor",
                      "value": "vendor1"
                  },
                  {
                      "label": "type",
                      "value": "type1"
                  },
                  {
                      "label": "status",
                      "value": "status1"
                  },
                  {
                      "label": "protocol",
                      "value": "protocol1"
                  },
              ],
              "controlls": [
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Slider",
                      "type": "slider",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Radio",
                      "type": "select",
                      "value": "value1",
                      "status": "status1",
                      "options": [
                          "option1",
                          "option2",
                          "option3",
                      ]
                  },
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
              ]
          },
          {
              "info": {
                  "title": "LightBulb",
                  "description": "Reprehenderit qui consectetur aute cupidatat velit commodo deserunt eu nulla eu. Nisi nulla enim aute et amet deserunt minim minim culpa. Proident cillum veniam velit sunt culpa laborum ullamco esse officia irure proident enim anim.",
              },
              "fields": [
                  {
                      "label": "name",
                      "value": "device1"
                  },
                  {
                      "label": "description",
                      "value": "description1"
                  },
                  {
                      "label": "ip",
                      "value": "ip1"
                  },
                  {
                      "label": "mac",
                      "value": "mac1"
                  },
                  {
                      "label": "vendor",
                      "value": "vendor1"
                  },
                  {
                      "label": "type",
                      "value": "type1"
                  },
                  {
                      "label": "status",
                      "value": "status1"
                  },
                  {
                      "label": "protocol",
                      "value": "protocol1"
                  },
              ],
              "controlls": [
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Slider",
                      "type": "slider",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Radio",
                      "type": "select",
                      "value": "value1",
                      "status": "status1",
                      "options": [
                          "option1",
                          "option2",
                          "option3",
                      ]
                  },
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
              ]
          },
          {
              "info": {
                  "title": "LightBulb",
                  "description": "Reprehenderit qui consectetur aute cupidatat velit commodo deserunt eu nulla eu. Nisi nulla enim aute et amet deserunt minim minim culpa. Proident cillum veniam velit sunt culpa laborum ullamco esse officia irure proident enim anim.",
              },
              "fields": [
                  {
                      "label": "name",
                      "value": "device1"
                  },
                  {
                      "label": "description",
                      "value": "description1"
                  },
                  {
                      "label": "ip",
                      "value": "ip1"
                  },
                  {
                      "label": "mac",
                      "value": "mac1"
                  },
                  {
                      "label": "vendor",
                      "value": "vendor1"
                  },
                  {
                      "label": "type",
                      "value": "type1"
                  },
                  {
                      "label": "status",
                      "value": "status1"
                  },
                  {
                      "label": "protocol",
                      "value": "protocol1"
                  },
              ],
              "controlls": [
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Slider",
                      "type": "slider",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Radio",
                      "type": "select",
                      "value": "value1",
                      "status": "status1",
                      "options": [
                          "option1",
                          "option2",
                          "option3",
                      ]
                  },
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
              ]
          },
          {
              "info": {
                  "title": "LightBulb",
                  "description": "Reprehenderit qui consectetur aute cupidatat velit commodo deserunt eu nulla eu. Nisi nulla enim aute et amet deserunt minim minim culpa. Proident cillum veniam velit sunt culpa laborum ullamco esse officia irure proident enim anim.",
              },
              "fields": [
                  {
                      "label": "name",
                      "value": "device1"
                  },
                  {
                      "label": "description",
                      "value": "description1"
                  },
                  {
                      "label": "ip",
                      "value": "ip1"
                  },
                  {
                      "label": "mac",
                      "value": "mac1"
                  },
                  {
                      "label": "vendor",
                      "value": "vendor1"
                  },
                  {
                      "label": "type",
                      "value": "type1"
                  },
                  {
                      "label": "status",
                      "value": "status1"
                  },
                  {
                      "label": "protocol",
                      "value": "protocol1"
                  },
              ],
              "controlls": [
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Slider",
                      "type": "slider",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Radio",
                      "type": "select",
                      "value": "value1",
                      "status": "status1",
                      "options": [
                          "option1",
                          "option2",
                          "option3",
                      ]
                  },
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
              ]
          },
      ]
  },
  {
      "id": 2,
      "name": "BoxOne",
      "router": "router1",
      "location": "location1",
      "description": "description1",
      "devices": [
          {
              "info": {
                  "title": "Not a light Buld",
                  "description": "Reprehenderit qui consectetur aute cupidatat velit commodo deserunt eu nulla eu. Nisi nulla enim aute et amet deserunt minim minim culpa. Proident cillum veniam velit sunt culpa laborum ullamco esse officia irure proident enim anim.",
              },
              "fields": [
                  {
                      "label": "name",
                      "value": "device2"
                  },
                  {
                      "label": "description",
                      "value": "description1"
                  },
                  {
                      "label": "ip",
                      "value": "ip1"
                  },
                  {
                      "label": "mac",
                      "value": "mac1"
                  },
                  {
                      "label": "vendor",
                      "value": "vendor1"
                  },
                  {
                      "label": "type",
                      "value": "type1"
                  },
                  {
                      "label": "status",
                      "value": "status1"
                  },
                  {
                      "label": "protocol",
                      "value": "protocol1"
                  },
              ],
              "controlls": [
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Slider",
                      "type": "slider",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Radio",
                      "type": "select",
                      "value": "value1",
                      "status": "status1",
                      "options": [
                          "option1",
                          "option2",
                          "option3",
                      ]
                  },
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
              ]
          },
          {
              "info": {
                  "title": "LightBulb",
                  "description": "Reprehenderit qui consectetur aute cupidatat velit commodo deserunt eu nulla eu. Nisi nulla enim aute et amet deserunt minim minim culpa. Proident cillum veniam velit sunt culpa laborum ullamco esse officia irure proident enim anim.",
              },
              "fields": [
                  {
                      "label": "name",
                      "value": "device1"
                  },
                  {
                      "label": "description",
                      "value": "description1"
                  },
                  {
                      "label": "ip",
                      "value": "ip1"
                  },
                  {
                      "label": "mac",
                      "value": "mac1"
                  },
                  {
                      "label": "vendor",
                      "value": "vendor1"
                  },
                  {
                      "label": "type",
                      "value": "type1"
                  },
                  {
                      "label": "status",
                      "value": "status1"
                  },
                  {
                      "label": "protocol",
                      "value": "protocol1"
                  },
              ],
              "controlls": [
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Slider",
                      "type": "slider",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Radio",
                      "type": "select",
                      "value": "value1",
                      "status": "status1",
                      "options": [
                          "option1",
                          "option2",
                          "option3",
                      ]
                  },
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
              ]
          },
          {
              "info": {
                  "title": "LightBulb",
                  "description": "Reprehenderit qui consectetur aute cupidatat velit commodo deserunt eu nulla eu. Nisi nulla enim aute et amet deserunt minim minim culpa. Proident cillum veniam velit sunt culpa laborum ullamco esse officia irure proident enim anim.",
              },
              "fields": [
                  {
                      "label": "name",
                      "value": "device1"
                  },
                  {
                      "label": "description",
                      "value": "description1"
                  },
                  {
                      "label": "ip",
                      "value": "ip1"
                  },
                  {
                      "label": "mac",
                      "value": "mac1"
                  },
                  {
                      "label": "vendor",
                      "value": "vendor1"
                  },
                  {
                      "label": "type",
                      "value": "type1"
                  },
                  {
                      "label": "status",
                      "value": "status1"
                  },
                  {
                      "label": "protocol",
                      "value": "protocol1"
                  },
              ],
              "controlls": [
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Slider",
                      "type": "slider",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Radio",
                      "type": "select",
                      "value": "value1",
                      "status": "status1",
                      "options": [
                          "option1",
                          "option2",
                          "option3",
                      ]
                  },
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
              ]
          },
          {
              "info": {
                  "title": "LightBulb",
                  "description": "Reprehenderit qui consectetur aute cupidatat velit commodo deserunt eu nulla eu. Nisi nulla enim aute et amet deserunt minim minim culpa. Proident cillum veniam velit sunt culpa laborum ullamco esse officia irure proident enim anim.",
              },
              "fields": [
                  {
                      "label": "name",
                      "value": "device1"
                  },
                  {
                      "label": "description",
                      "value": "description1"
                  },
                  {
                      "label": "ip",
                      "value": "ip1"
                  },
                  {
                      "label": "mac",
                      "value": "mac1"
                  },
                  {
                      "label": "vendor",
                      "value": "vendor1"
                  },
                  {
                      "label": "type",
                      "value": "type1"
                  },
                  {
                      "label": "status",
                      "value": "status1"
                  },
                  {
                      "label": "protocol",
                      "value": "protocol1"
                  },
              ],
              "controlls": [
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Slider",
                      "type": "slider",
                      "value": "value1",
                      "status": "status1",
                  },
                  {
                      "name": "Radio",
                      "type": "select",
                      "value": "value1",
                      "status": "status1",
                      "options": [
                          "option1",
                          "option2",
                          "option3",
                      ]
                  },
                  {
                      "name": "Switch",
                      "type": "switch",
                      "value": "value1",
                      "status": "status1",
                  },
              ]
          },
      ]
  },
]

app.post('/test', (req, res) => {
  res.send({data: 'Hello World!'})
  })

app.post('/addBox', (req, res) => {
  const box = req.body
  console.log(box)
  publish(box, channelPub, async (response) => {
    console.log(response)
    res.send(response)
    })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getTemplateData', (req, res) => {
  res.send({templateData: templateData})
})

app.get('/file', (req, res) => {
  res.sendFile('C:/Users/rasco/Documents/GitHub/IOT-Managment-Server' + '/templates/html.txt')
})

//hello

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
  /* console.log(req.body.message)
  if(req.body.message) {
    res.send({msg: 'True', status: req.body.message})
  } else {
    res.send({msg: 'False'})
  } */
  
  publish(req.body.message, channelPub, async (response)=> {
    console.log(response)
    if(response.status == true) {
      await channelCon.consume('backendSend', function (msg) {
        console.log(msg.content.toString() + " : mes")
        channelCon.ack(msg);
        res.send({msg: msg.content.toString()})
        })
    } else {
      res.send(response);
    }
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

process.on('exit', function() {
  console.log('About to exit.');
  connectionPub.close()
  connectionCon.close()
});