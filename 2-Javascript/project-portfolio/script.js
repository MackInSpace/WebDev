async function fetchCryptoPrices() {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
    const data = await response.json();
    return data.bpi.USD.rate;
}

function updateTicker(price) {
    const tickerElement = document.getElementById('crypto-ticker');
    tickerElement.textContent = `BTC Price: $${price}`;
}

async function startTicker() {
    const price = await fetchCryptoPrices();
    updateTicker(price);
    setInterval(async () => {
        const newPrice = await fetchCryptoPrices();
        updateTicker(newPrice);
    }, 60000); //update every minute
}

document.addEventListener('DOMContentLoaded', startTicker);