const cryptoIdMapping = {
    'btc': 'bitcoin',
    'eth': 'ethereum',
    'ltc': 'litecoin',
    'sol': 'solana',
    'bnb': 'binancecoin', 
    'ada': 'cardano',
    'xrp': 'ripple',
    'doge': 'dogecoin',
    'dot': 'polkadot',
    'uni': 'uniswap',
};


async function fetchCryptoPrices(crypto) {
    const cryptoId = cryptoIdMapping[crypto] || crypto;
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const url = `${proxyUrl}${encodeURIComponent(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`)}`;
    console.log('Fetching URL:', url); 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const jsonResponse = await response.json();
        const data = JSON.parse(jsonResponse.contents);
        console.log('API Response:', data); 
        if (!data[cryptoId] || !data[cryptoId].usd) {
            throw new Error(`No price data found for ${cryptoId}`);
        }
        return data[cryptoId].usd;
    } catch (error) {
        console.error('Fetch Error:', error.message); 
        throw new Error('Failed to fetch data. Please try again later.');
    }
}

function updateTicker(price, crypto) {
    const tickerElement = document.getElementById('crypto-ticker');
    tickerElement.textContent = `${crypto.toUpperCase()} Price: $${price}`;
}

function addFavorite(crypto) {
    let favorites = JSON.parse(localStorage.getItem('favoriteCryptos')) || [];
    if (!favorites.includes(crypto)) {
        favorites.push(crypto);
        localStorage.setItem('favoriteCryptos', JSON.stringify(favorites));
        displayFavorites();
    }
}

function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favoriteCryptos')) || [];
    const favoriteCoinsElement = document.getElementById('favorite-coins');
    favoriteCoinsElement.innerHTML = '';
    favorites.forEach(crypto => {
        const favoriteElement = document.createElement('div');
        favoriteElement.textContent = crypto.toUpperCase();
        favoriteElement.addEventListener('click', () => startTicker(crypto));
        favoriteCoinsElement.appendChild(favoriteElement);
    });
}

async function startTicker(crypto) {
    try {
        const price = await fetchCryptoPrices(crypto);
        updateTicker(price, crypto);
    } catch (error) {
        console.error(error); 
        const tickerElement = document.getElementById('crypto-ticker');
        tickerElement.textContent = 'Failed to fetch data. Please try again.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
    const searchButton = document.getElementById('search-button');
    const addFavoriteButton = document.getElementById('add-favorite-button');
    searchButton.addEventListener('click', () => {
        const cryptoInput = document.getElementById('crypto-input').value.trim().toLowerCase();
        console.log('User input:', cryptoInput); 
        if (cryptoInput) {
            startTicker(cryptoInput);
        } else {
            const tickerElement = document.getElementById('crypto-ticker');
            tickerElement.textContent = 'Please enter a cryptocurrency.';
        }
    });
    addFavoriteButton.addEventListener('click', () => {
        const cryptoInput = document.getElementById('crypto-input').value.trim().toLowerCase();
        if (cryptoInput) {
            addFavorite(cryptoInput);
        }
    });
});