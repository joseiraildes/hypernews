async function Ip(){
  // https://api.ipify.org/
  try{
    const response = await fetch('https://api.ipify.org/');
    const ip = await response.text();
    return ip
  } catch(error){
    console.error('Error:', error);
  }
}

module.exports = Ip