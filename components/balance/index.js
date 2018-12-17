import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const COIN_BALANCE = gql`
  query coins {
    positions {
      coins {
        quantity
        price
      }
    }
  }
`

class Balance extends React.Component {
  onBalanceFetched = coins => {
    if (coins && coins.length) {
      return coins.reduce((acc, coin) => acc += (coin.quantity * coin.price), 0)
    }

    return 0
  }

  fetchBalance = () => {
    return(
      <Query query={COIN_BALANCE} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return "Loading..."
          if (error) return `Error! ${error.message}`
          const { coins } = data.positions
          const balance = this.onBalanceFetched(coins)

          return (
            <div>
              <h3>${balance}</h3>
            </div>
          );
        }}
      </Query>
    )
  }

  render() {
    return(
      <div>
        <h3>
          {this.fetchBalance()}
        </h3>
      </div>
    )
  }
}

export default Balance