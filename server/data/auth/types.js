const authTypes = `
  type User {
    email: String!
    name: String!
    password: String!
    coins: [Coin]
  }
`

const authQueries = `
  account: User
`

const authMutations = `
  createUser(email: String!, name: String!, password: String!): User
  login(email: String!, password: String!): User
`

module.exports = { authTypes, authQueries, authMutations }
