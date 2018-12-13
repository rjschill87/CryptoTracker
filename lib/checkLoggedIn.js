import gql from 'graphql-tag'

export default (context, apolloClient) => {
  return apolloClient
    .query({
      query: gql`
        query loggedInUser {
          account {
            name
            email
            coins {
              name
              ticker
              quantity
              price
            }
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data }
    })
    .catch((e) => {
      // Fail gracefully
      return { loggedInUser: {} }
    })
}
