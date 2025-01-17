const cryptoIdMapping = {
    'btc': 'bitcoin',
    'eth': 'ethereum',
    'ltc': 'litecoin',
    // Add more mappings as needed
};

async function fetchCryptoPrices(crypto) {
    const cryptoId = cryptoIdMapping[crypto] || crypto;
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`;
    console.log('Fetching URL:', url); // Debugging line
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log('API Response:', data); // Debugging line
    if (!data[cryptoId] || !data[cryptoId].usd) {
        throw new Error(`No price data found for ${cryptoId}`);
    }
    return data[cryptoId].usd;
}

function updateTicker(price, crypto) {
    const tickerElement = document.getElementById('crypto-ticker');
    tickerElement.textContent = `${crypto.toUpperCase()} Price: $${price}`;
}

async function startTicker(crypto) {
    try {
        const price = await fetchCryptoPrices(crypto);
        updateTicker(price, crypto);
    } catch (error) {
        console.error(error); // Debugging line
        const tickerElement = document.getElementById('crypto-ticker');
        tickerElement.textContent = 'Failed to fetch data. Please try again.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const cryptoInput = document.getElementById('crypto-input').value.trim().toLowerCase();
        console.log('User input:', cryptoInput); // Debugging line
        if (cryptoInput) {
            startTicker(cryptoInput);
        } else {
            const tickerElement = document.getElementById('crypto-ticker');
            tickerElement.textContent = 'Please enter a cryptocurrency.';
        }
    });
});
