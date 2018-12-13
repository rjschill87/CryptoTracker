const authQueries = require('./auth/queries')
const authMutations = require('./auth/mutations')

const userQueries = require('./user/queries')
const userMutations = require('./user/mutations')

module.exports = {
  Query: {
    ...authQueries,
    ...userQueries
  },
  Mutation: {
    ...authMutations,
    ...userMutations
  }
}
