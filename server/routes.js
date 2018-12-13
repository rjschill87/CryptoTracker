const passport = require('passport')

module.exports = (server, passport) => {
  server.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })
}
