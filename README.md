# stock-market-recommender
An app that can provide a buy, hold or sell recommendation when given a stock symbol

This app is built using vue.js
- This project is created with `Vue CLI 3` ( [link](https://cli.vuejs.org/) )
- There is no back-end for now, but will be added as part of the next step.
- 2 main components 
    - form (to input user data)
    - chart (displays stock recommendations for a stock symbol, during provided time frame)
- Social media post section will be added as part of future steps

## Follwoing theory is followed to make a recommendation

- When stock price is lower or similar to price median
    - social media post count is greater or similar to count median => BUY
    - social media post count is smaller than count median => HOLD
- When stock price is higher than price median (in the date range)
    - social media post count is greater or similar to count median => HOLD
    - social media post count is smaller than count median => SELL
- price median and count median are calculated using provided data available in the time frame


## Project setup

### Clone the repo and go into the directory
```
git clone git@github.com:Nirav1210/stock-market-recommender.git
cd stock-market-recommender/stock-market-recommender/
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

## Libraries used

### For chart
- vue-chartjs ( [Link](https://vue-chartjs.org/) )

### For Unit tests
- Vue Test Utils( [Link](https://vue-test-utils.vuejs.org/) )
