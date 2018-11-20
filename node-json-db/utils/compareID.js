const checkID = (req, data) => {
  try {
    const length = data.length
    if(req.params.id >= length) {
      throw new Error('nie znaleziono dokumentu o podanym id')
      return res.status(404).end("Nie znaleziono dokumentu o podanym ID")
    }
  }
  catch(e) {
    console.log('err: ' + e)
  }
}

module.exports = checkID