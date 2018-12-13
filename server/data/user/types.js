const userTypes = `
  type Position {
    coins: [Coin]
  }

  type Coin {
    price: Float!
    name: String!
    ticker: String!
    quantity: Int!
  }
`

const userQueries = `
  positions: Position
`

const userMutations = `
  addPosition(email: String!, ticker: String! quantity: Int!, price: Int!): User
`

module.exports = {
  userTypes,
  userQueries,
  userMutations
}