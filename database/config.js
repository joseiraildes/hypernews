const mysql = require("mysql2")
require("dotenv").config()
async function MySql(){
  const connection = await mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
  })

  const pool = connection.promise()

  return pool
}

module.exports = MySql