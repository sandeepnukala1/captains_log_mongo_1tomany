require('dotenv').config()
const express = require('express')
const mongoose = require('./db/connection')
const { log } = require('mercedlogger')
const methodOverride = require('method-override')
const morgan = require('morgan')
const cors = require('cors')
const Log = require('./models/logs')
const PORT = process.env.PORT || '2021'

const app = express()

app.set('view engine', 'ejs')

app.use(cors())
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(morgan('tiny'))
app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.redirect("/logs")
})

app.get("/logs", (req, res) => {
    Log.find({}, (error, allLogs) => {
        res.render('index', { logs: allLogs })
    })
})

app.get("/logs",(req, res) => {
    res.render("new");
});

app.post("/logs", (req, res) => {
  req.body.shipIsBroken === "on" ? req.body.shipIsBroken = true : 
  req.body.shipIsBroken = false
  Log.create(req.body, (error, createdLog) => {
    //   res.redirect("show")
  })
  res.send(req.body)
})

app.listen(PORT, () => {
    log.cyan(`Listening on Port ${PORT}`)
})