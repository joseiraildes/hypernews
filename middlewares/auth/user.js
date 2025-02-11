const Ip = require("../../json/ip/address/auth.js");
const User = require("../../models/User.js");

const verifiyUser = (req, res, next)=>{
  const ip = Ip()
  const user = User.findOne({
    where: {
      ip
    }
  })

  if(!user){
    res.status(401).redirect("/login")
    console.log({
      message: "Usuário não encontrado!"
    })
  }else{
    next()
  }
}

module.exports = verifiyUser