const express = require("express")
const app = require("./config/config.js")
const hbs = require("express-handlebars")
const path = require("path")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// hbs config
app.set("hbs", hbs.engine())
app.set("view engine", "hbs")
app.set("views", path.join(__dirname + "/views"))

app.get("/", async(req, res)=>{
  res.json({
    message: "Hello World!"
  })
})