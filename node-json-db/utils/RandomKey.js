const rn = require('random-number')

class RandomKey {
  constructor(arrID, currentIndex) {
    this.arrID = arrID
    this.currentIndex = currentIndex
    this.check = false
  }
  startMachine() {
    while(!this.check) {
      this.checkRepeat_ID()
      this.getRandomNumber()
      this.getNewItem()

      if(this.newItem !== undefined) {
        return this.newItem
      }

      this.check = false
      return false
    }
  }
  
  checkRepeat_ID() {
    this.arrID.push(this.newItem)
    this.check = this.arrID.reduce((a, b) => {
      if(a === b) {
        b = null
        return false
      }
      return true
    })
  }
    
  getRandomNumber() {
    const options = {
      min: 0,
      max: 1000,
      integer: true
    }
    let nr = rn(options)
    if(nr) {
      this.randomNR = nr
      return this.randomNR
    }
  }

  getNewItem() {
    let nr = this.randomNR
    if(nr) return this.newItem = `${nr}index${this.currentIndex}`
    if(this.newItem) return this.newItem
  }
}

module.exports = RandomKey