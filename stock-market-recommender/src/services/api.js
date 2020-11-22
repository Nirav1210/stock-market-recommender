import { getMedians, getDaysArray } from "./helpers";

/**
 * Returns an array of prices, for a given time period
 * @param {*} stockSymbol String
 * @param {*} startDate String
 * @param {*} endDate String
 */
export function stockPriceGenerator(stockSymbol, startDate, endDate) {
  const max = 500;
  const min = 1;
  let prices = [];

  if (!startDate || !endDate) {
      const tenDaysBefore = new Date(Date.now() - 9 * 24 * 60 * 60 * 1000);
      startDate = tenDaysBefore.toISOString().slice(0,10);
      endDate = new Date(Date.now()).toISOString().slice(0,10);
    // numberOfDays = getNumberOfDays(startDate, endDate);
  }
  const days = getDaysArray(new Date(startDate), new Date(endDate));

  for (let i = days.length - 1; i >= 0; i--) {
    let day = days[i].toISOString().slice(0,10)
    const rand = Math.random() * (max - min) + min;
    prices.push({ date: day, price: rand.toFixed(2) });
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
  let postCount = 0

  // add all social media post counts for a stock symbol
  mediaTypes.forEach(() => {
    const rand = Math.floor(Math.random() * (max - min) + min);
    postCount += rand;
  });

  return postCount;
}

/**
 * Provides a buy, hold or sell recommendation when given stock prices,
 * social media counts and risk ratios
 * @param {*} prices Array - list of stock prices per dates
 * @param {*} counts Array - list of socia media counts
 */
export function recommendationAlgorithm(prices, counts) {
  if (counts.length === 0 || prices.length !== counts.length) {
    return [];
  }

  let values = prices.map(item => item.price);

  const { priceMedian, countMedian } = getMedians(values, counts);

  // follwoing theory is followed to make a recommendation

  // when price is lower or similar to priceMedian and
  // count is greater or similar to countMedian -> buy
  // count is smaller than countMedian -> hold

  // when price is higher than priceMedian and
  // count is greater or similar to countMedian -> buy
  // count is smaller than countMedian -> sell

  let ratings = [];
  values.forEach((price, index) => {
    if (price <= priceMedian) {
      counts[index] >= countMedian.toFixed(2)
        ? ratings.push([price, "buy", prices[index].date])
        : ratings.push([price, "hold", prices[index].date]);
    } else {
      counts[index] >= countMedian.toFixed(2)
        ? ratings.push([price, "buy", prices[index].date])
        : ratings.push([price, "sell", prices[index].date]);
    }
  });

  return ratings;
}
