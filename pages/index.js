import React, { Component, Fragment } from 'react'
import Link from 'next/link'

import withData from '../lib/withData'
import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'
import Layout from '../components/layout'
import Balance from '../components/balance'
import PositionForm from '../components/forms/addPosition'

class Index extends Component {
  static async getInitialProps(context, apolloClient) {
    const { req } = context
    const { loggedInUser } = await checkLoggedIn(req, apolloClient)
    return { loggedInUser }
  }

  render() {
    const { account } = this.props.loggedInUser
    if (account) {
      return (
        <Layout account={account}>
          <div className='container'>
            <h1> Hello {account.name}! </h1>
            <Balance account={account}/>
            <PositionForm account={account}/>
            <br />
            <button onClick={() => redirect({}, '/logout')}>Logout</button>
            <Link href='/profile'>
              <a>Go to Profile</a>
            </Link>
          </div>
        </Layout>
      )
    }

    return (
      <div>
        <h1> Crypto Coin Tracker </h1>
        <Link href='/login'>
          <a>Login</a>
        </Link>{' '}
        or{' '}
        <Link href='/signup'>
          <a>Signup</a>
        </Link>{' '}
        to view hidden resources
        <br /> <br />
      </div>
    )
  }
}

export default withData(Index)
