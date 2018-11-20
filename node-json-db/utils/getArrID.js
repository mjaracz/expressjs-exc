function getArrID(data, length) {
  const arrID = []
  for(let i = 0; i < length; i++) {
    arrID[i] = data[i].ID 
  }
  return arrID
}

module.exports = getArrID