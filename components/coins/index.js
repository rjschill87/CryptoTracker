import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Coin from '../coins/coin'

const COINS = gql`
  query coins {
    positions {
      coins {
        price
        name
        ticker
        quantity
      }
    }
  }
`

class CoinList extends React.Component {
  constructor(props) {
    super(props)

    const { coins } = this.props.account

    this.state = {
      positionsExist: coins.length > 0,
    }
  }

  fetchCoins = () => {
    return(
      <Query query={COINS} pollInterval={300}>
        {({ loading, error, data }) => {
          if (loading) return "Loading..."
          if (error) return `Error! ${error.message}`
          const { coins } = data.positions || []

          return(
            <div>
              {coins.length > 0 &&
                coins.map((coin, i) => {
                  return <Coin {...coin} key={i}/>
                })
              }
            </div>
          )
          
        }}
      </Query>
    )
  }

  render() {
    return(
      <section>
        <div>
          { this.state.positionsExist && (
            <div>
              <h3>
                Positions
              </h3>
            </div>
          ) }
        </div>
        <ul>
          {this.fetchCoins()}
        </ul>
        <style jsx>{`
          ul {
            padding: 0.375rem;
            background-color: lightgrey;
          }
        `}</style>
      </section>
    )
  }
}

export default CoinList