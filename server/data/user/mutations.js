const axios = require('axios')

const User = require('../../models/User')
const Coin = require('../../models/Coin')

const apiKey = process.env.CMC_API_KEY
const endpoint = process.env.CMC_URL

verifyCoinExists = ticker => {
  const url = `${endpoint}v1/cryptocurrency/quotes/latest?symbol=${ticker}`

  return new Promise((resolve) => {
    return axios.get(url, {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey
        }
      })
      .then((res) => {
        const { data } = res
        const cmcCoin = data.data[ticker]
        const price = parseInt(cmcCoin.quote.USD.price).toFixed(2)
  
        Coin.findOneAndUpdate({ ticker }, { $set: {name: cmcCoin.name, price} }, { upsert: true, new: true })
          .exec((err, doc) => {
            resolve(!err ? doc : false)
          })
      })
      .catch((err) => {
        console.log('>>> err', err);
        resolve(false)
      })
  })
}

module.exports = {
  addPosition(root, { email, ticker, quantity, price}) {
    const position = { ticker, quantity, price }

    return new Promise(async (resolve, reject) => {
      const exists = await verifyCoinExists(position.ticker)
      if (exists) {
        position.name = exists.name
        
        return User.findOneAndUpdate({ email }, { $push: { coins: position } }, { new: true })
          .exec((err, user) => {
            if (err) return reject('Error adding position');
            if (user) {
              resolve(user)
            }
          })
      }
    })
  }
}