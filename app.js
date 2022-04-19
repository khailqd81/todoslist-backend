const express = require('express')
const app = express()
const port = 4000
const router = require("./routers/index");
const bodyParser = require("body-parser");
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var cors = require('cors')
app.use(cors())
app.use('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}, router)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})