async function fetchCryptoData() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();
    return data;
}

function updateTicker(data) {
    const ticker = document.getElementById('crypto-ticker');
    ticker.innerHTML = '';
    data.forEach(coin => {
        const cryptoElement = document.createElement('div');
        cryptoElement.className = 'crypto';
        cryptoElement.innerHTML = `<h2>${coin.name}</h2>
                                   <p>Price: $${coin.current_price}</p>
                                   <p>Market Cap: $${coin.market_cap}</p>`;
        ticker.appendChild(cryptoElement);
    });
}

async function init() {
    const data = await fetchCryptoData();
    updateTicker(data);
    setInterval(async () => {
        const updatedData = await fetchCryptoData();
        updateTicker(updatedData);
    }, 60000);
}

init();