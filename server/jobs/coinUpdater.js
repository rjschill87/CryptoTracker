const { CronJob } = require('cron')
const axios = require('axios')
const Coin = require('../models/Coin')

const apiKey = process.env.CMC_API_KEY
const endpoint = process.env.CMC_URL

const updateCoinPrices = (coinObjects) => {
  coinObjects.forEach((coinObj) => {
    const { name, symbol } = coinObj
    const price = coinObj.quote.USD.price.toFixed(2)

    Coin.findOneAndUpdate({ ticker: symbol }, { $set: { name, price } }, { upsert: true })
      .exec((err) => {
        if (err) {
          console.log('>>> err updating coin price', ticker)
        }
      })
  })
}

const fetchCoinPrices = () => {
  const url = `${endpoint}v1/cryptocurrency/listings/latest?limit=5000`

  axios.get(url, {
    headers: {
      'X-CMC_PRO_API_KEY': apiKey
    }
  })
  .then((res) => {
    const { data } = res
    updateCoinPrices(data.data)
  })
  .catch((err) => {
    console.log('>>> fetchCoinPrices err', err);
  })
}

module.exports = {
  run: () => {
    const job1 = new CronJob({
      cronTime: '*/7 * * * * *',
      onTick: fetchCoinPrices,
      start: false,
      timeZone: 'America/New_York',
    });

    job1.start();
  }
}