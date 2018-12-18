const mongoose = require('mongoose')
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const { Schema } = mongoose
mongoose.Promise = global.Promise

const coinSchema = new Schema({
  ticker: {
    type: String,
    trim: true,
    required: 'A ticker symbol is required',
  },
  name: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: 'A price is required'
  },
  cmc_id: {
    type: Number,
  }
})

module.exports = mongoose.model('Coin', coinSchema)