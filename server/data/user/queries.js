const User = require('../../models/User')

module.exports = {
  positions(root, args, req) {
    return new Promise((resolve) => {
      if (req.user) {
        User.findOne({ email: req.user.email })
          .then((user) => {

            return resolve(user)
          })
      } else {
        return resolve(null)
      }
    })
  }
}