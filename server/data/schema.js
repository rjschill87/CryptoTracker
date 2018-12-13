const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const { authTypes, authQueries, authMutations } = require('./auth/types')
const { userTypes, userQueries, userMutations } = require('./user/types')

const typeDefs = `
	${authTypes}
	${userTypes}
	type Query {
		${authQueries}
		${userQueries}
	}
	type Mutation {
		${authMutations}
		${userMutations}
	}
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
