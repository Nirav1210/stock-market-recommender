export function getNumberOfDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    return timeDifference / (1000 * 3600 * 24);
}

export function getMedians(prices, counts) {
    if (!prices.length || !counts.length) {
        return null;
    }

    // example - 1 (isOdd scenario)
    // price = [2, 15, 4], sorted = [2, 4, 15], counts = [0, 6, 1]
    // price_median is = 4, index_of_price_median = 2
    // count_median (count at matching index_of_price_median = counts[2]) is = 1

    // example - 2 (isEven scenario)
    // price = [2, 15, 4, 9], sorted = [2, 4, 9, 15], counts = [0, 6, 1, 2]
    // price_median is = ( 4 + 9 ) / 2 = 6.5, indices_of_price_median = [2, 3]
    // count_median (count at matching index_of_price_median = (counts[2] + count[3]) / 2) is = 1.5

    const middle = (prices.length + 1) / 2;
    const sorted = [...prices].sort((a, b) => a - b);
    const isEven = sorted.length % 2 === 0;
    return isEven ?
        {
            priceMedian: (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2,
            countMedian: (counts[prices.indexOf(sorted[middle - 1.5])] + counts[prices.indexOf(sorted[middle - 0.5])]) / 2
        } :
        {
            priceMedian: sorted[middle - 1],
            countMedian: counts[prices.indexOf(sorted[middle - 1])]
        };
}