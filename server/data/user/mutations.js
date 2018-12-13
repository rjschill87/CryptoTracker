const User = require('../../models/User')

module.exports = {
  addPosition(root, { email, ticker, quantity, price}) {
    const coin = { ticker, quantity, price, name: 'Bitcoin'}
    return new Promise((resolve, reject) => {
      return User.findOneAndUpdate({ email }, { $push: { coins: coin } }, { new: true })
        .exec((err, user) => {
          if (err) return reject('Error adding position');
          if (user) {
            resolve(user)
          }
        })
    })
  }
}