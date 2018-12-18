const User = require('../../models/User')
const Coin = require('../../models/Coin')

updatedCoinPrices = (userCoins) => {
  const tickerArray = userCoins.map(userCoin => userCoin.ticker)

  return new Promise((resolve) => {
    return Coin.find({
      ticker: {
        $in: tickerArray
      }
    })
    .exec((err, docs) => {
      resolve(!err ? docs : false)
    })
  })
  
}

module.exports = {
  positions(root, args, req) {
    return new Promise((resolve) => {
      if (req.user) {
        User.findOne({ email: req.user.email })
          .then(async (user) => {
            let { coins } = user
            const dbCoins = await updatedCoinPrices(coins)

            user.coins.forEach((userCoin) => {
              const updatedCoin = dbCoins.filter((dbCoin) => dbCoin.ticker === userCoin.ticker)[0]
              userCoin.price = updatedCoin.price
            })

            return resolve(user)
          })
      } else {
        return resolve(null)
      }
    })
  }
}