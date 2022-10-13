function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}


async function main() {

/* Using for reference from prompt
let GME = result.GME
let MSFT = result.MSFT
let DIS = result.DIS
let BTNX = result.BTNX

const stocks = [GME, MSFT, DIS, BNTX];

*/

    let timeChartCanvas = document.querySelector('#time-chart');
    let highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    let averagePriceChartCanvas = document.querySelector('#average-price-chart');

    let response = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=e5194c9dd2cd4adc9dacc2ef50b3b6ab`)

    let result = await response.json()

    let { GME, MSFT, DIS, BNTX } = result;

    let stocks = [GME, MSFT, DIS, BNTX];

    stocks.forEach( stock => stock.values.reverse())

    
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                data: stock.values.map(value => parseFloat(value.high))
            }))
        }
    });

    
   //begin new chart for highest
   //use same format as above but need to change type, label (.map)
   //don't forget the function for this

   new Chart(highestPriceChartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: stocks.map(stock => stock.meta.symbol),
        datasets: [{
            label: 'Highest',
            backgroundColor: stocks.map(stock => (
                getColor(stock.meta.symbol)
            )),
            borderColor: stocks.map(stock => (
                getColor(stock.meta.symbol)
            )),
            data: stocks.map(stock => (
                findHighest(stock.values)
            ))
        }]
    }
});

// repeat, change type type to pie. use .map again
//write function for this as well or chart will not show 


new Chart(averagePriceChartCanvas.getContext('2d'), {
    type: 'pie',
    data: {
        labels: stocks.map(stock => stock.meta.symbol),
        datasets: [{
            label: 'Average',
            backgroundColor: stocks.map(stock => (
                getColor(stock.meta.symbol)
            )),
            borderColor: stocks.map(stock => (
                getColor(stock.meta.symbol)
            )),
            data: stocks.map(stock => (
                calculateAverage(stock.values)
            ))
        }]
    }
});
}


// pass in values 
function findHighest(values) {
let highest = 0;
values.forEach(value => {
    if (parseFloat(value.high) > highest) {
        highest = value.high
    }
})
return highest
}


//pass in values and this one will have to be divided but total because returning and average
function calculateAverage(values) {
let total = 0;
values.forEach(value => {
    total += parseFloat(value.high)
})
return total / values.length
}

main()
