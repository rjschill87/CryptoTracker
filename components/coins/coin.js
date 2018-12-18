import React from 'react'

class Coin extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      value: 0
    }
  }

  componentWillMount() {
    this.setState({
      value: this.props.quantity * this.props.price
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({
        value: nextProps.quantity * nextProps.price
      })
    }
  }

  render() {
    return (
      <li>
        <h3>{this.props.ticker}</h3>
        <div>
          <span>qty: {this.props.quantity}</span>
          <span>value: {this.state.value}</span>
        </div>
        <style jsx>{`
          li {
            list-style: none;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-content: center;
            background-color: white;
            padding: 0.875rem;
          }

          li:not(:last-child) {
            margin-bottom: 0.375rem;
          }

          div {
            display: flex;
            flex-direction: row;
            align-items: center;
          }

          span {
            display: block;
          }

          span:last-child {
            padding-left: 0.375rem;
          }
        `}</style>
      </li>
    )
  }
}

export default Coin