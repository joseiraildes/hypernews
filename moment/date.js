const moment = require("moment")
moment.locale("pt-br")

// date and hour format
function formatDate() {
  const date = moment().format("dddd, D [de] MMMM [de] YYYY [às] HH:mm:ss")

  // console.log(date)
  return date
}

module.exports = formatDate