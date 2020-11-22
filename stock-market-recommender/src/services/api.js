import { getNumberOfDays, getMedians } from './helpers';

/**
 * Returns an array of prices, for a given time period
 * @param {*} stockSymbol String
 * @param {*} startDate String
 * @param {*} endDate String
 */
export function stockPriceGenerator(stockSymbol, startDate, endDate) {
  let numberOfDays = 10;
  const max = 500;
  const min = 1;
  let prices = [];

  if (startDate && endDate) {
    numberOfDays = getNumberOfDays(startDate, endDate);
  }

  for (let i = numberOfDays; i > 0; i--) {
    const rand = Math.random() * (max - min) + min;
    prices.push(rand.toFixed(2));
  }

  return prices;
}

/**
 * Returns count of social media posts for a given stock and media type
 * @param {*} stockSymbol String
 * @param {*} mediaTypes Array
 */
export function socialMediaCountGenerator(stockSymbol, mediaTypes) {
  if (!mediaTypes || !stockSymbol) {
    return;
  }

  const min = 0;
  const max = 100;
  let mediaInfo = {};

  mediaTypes.forEach((type) => {
    const rand = Math.floor(Math.random() * (max - min) + min);
    mediaInfo[type] = rand;
  });

  return mediaInfo;
}

/**
 * Provides a buy, hold or sell recommendation when given stock prices,
 * social media counts and risk ratios
 * @param {*} prices Array - list of stock prices
 * @param {*} counts Array - list of socia media counts
 */
export function recommendationAlgorithm(prices, counts) {
  if (prices.length !== counts.length) {
    return null;
  }

  const { priceMedian, countMedian } = getMedians(prices, counts);

  // follwoing theory is followed to make a recommendation

  // when price is lower or similar to priceMedian and
  // count is greater or similar to countMedian -> buy
  // count is smaller than countMedian -> hold

  // when price is higher than priceMedian and
  // count is greater or similar to countMedian -> buy
  // count is smaller than countMedian -> sell

  let ratings = [];
  prices.forEach((price, index) => {
    if (price <= priceMedian.toFixed(2)) {
      counts[index] >= countMedian.toFixed(2) ? ratings.push([price, "buy"]) : ratings.push([price, "hold"]);
    } else {
      counts[index] >= countMedian.toFixed(2) ? ratings.push([price, "buy"]) : ratings.push([price, "sell"]);
    }
  });

  return ratings;
}
