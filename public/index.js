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
}

main()