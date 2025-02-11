const express = require("express")
const app = require("./config/config.js")
const hbs = require("express-handlebars")
const path = require("path")
const User = require("./models/User.js")
const bcrypt = require("bcryptjs")
const Ip = require("./json/ip/address/auth.js")
const { marked } = require("marked")
const formatName = require("./infra/formatName.js")
const formatDate = require("./moment/date.js")
// const formatName = require("./infra/formatName.js")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// hbs config
app.set("hbs", hbs.engine())
app.set("view engine", "hbs")
app.set("views", path.join(__dirname + "/views"))

const userPropeties = {
  email: "example@email.com",
  senha: bcrypt.hashSync("senha123", 10),
  ip: "0.0.0.0",
  bio: "Hello World"
}

app.get("/", async(req, res)=>{
  res.json({
    message: "Hello World!"
  })
})
app.post("/login", async(req, res)=>{
  const ip = await Ip()
  const { email, senha } = req.body
  const user = await User.findOne({
    where: {
      email
    }
  })

  if(!user) return res.status(401).json({ error: "Email ou senha inválidos!" })
  
  const passwordsMatch = await bcrypt.compare(req.body.senha, user.senha)
  
  if(!passwordsMatch) return res.status(401).json({ error: "Email ou senha inválidos!" })
  
  await User.update(
    {
      ip
    },
    {
      where: {
        email
      }
    }
  )
  
   
  res.status(200).redirect("/")
  console.log({
    message: "Login efetuado com sucesso!",
    user
  })
})
app.post("/cadastro", async(req, res)=>{
  const { email, senha } = req.body
  const nameFormat = req.body.nome
  const date = formatDate()
  const nome = formatName(req.body.nome)
  const user = await User.findOne({
    where: {
      email,
      nome
    }
  })

  if(user != null) return res.status(409).json({ error: "Email ou nome de usuário já cadastrado!" })
  
  const hashedPassword = bcrypt.hashSync(senha, 10)
  const hashedToken = bcrypt.hashSync(ip, 10)
  const ip = await Ip()

  const newUser = await User.create({
    nome,
    email,
    senha: hashedPassword,
    ip,
    biografia: marked("Hello World!!"),
    data: date
  })

  res.redirect("/")
})
