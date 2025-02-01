document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn2').addEventListener('click', function() {
        const query = document.querySelector('.search-bar-long').value.trim().toLowerCase().replace(/ /g, '-');
        console.log('Search Query:', query); 

        if (query in cryptoIDs) {
            fetchCryptoData(cryptoIDs[query]);
        } else {
            alert('Unknown cryptocurrency ID. Please enter a valid name.');
        }
    });

    // Fetch and display top coins
    fetchTopCoins();

    // Fetch and display trending coins
    fetchTrendingCoins();

    // Fetch and display new coins
    fetchNewCoins();
});

// List of known cryptocurrency IDs
const cryptoIDs = {
    bitcoin: 'bitcoin',
    btc: 'bitcoin',
    ethereum: 'ethereum',
    eth: 'ethereum',
    dogecoin: 'dogecoin',
    doge: 'dogecoin',
    litecoin: 'litecoin',
    ltc: 'litecoin',
    ripple: 'ripple',
    xrp: 'ripple',
    // Add more as needed
};

// Function to fetch data from CoinGecko API
function fetchCryptoData(query) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data); 
            if (data.length > 0) {
                displayCryptoData(data[0]);
            } else {
                alert('No data found for the entered query');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again later.');
        });
}

// Function to display cryptocurrency data
function displayCryptoData(crypto) {
    const container = document.getElementById('crypto-result-container');
    container.innerHTML = '';

    const resultDiv = document.createElement('div');
    resultDiv.id = 'crypto-result';
    resultDiv.classList.add('col-12', 'p-3', 'bg-white', 'rounded');
    
    resultDiv.innerHTML = `
        <h3><img src="${crypto.image}" alt="${crypto.name} logo" width="20"> ${crypto.name} (${crypto.symbol.toUpperCase()})</h3> <!-- Added coin logo -->
        <p>Current Price: $${crypto.current_price}</p>
        <p>Market Cap: $${crypto.market_cap}</p>
        <p>24h Change: ${crypto.price_change_percentage_24h.toFixed(2)}%</p>
    `;
    
    container.appendChild(resultDiv);
}

// Function to fetch top coins
function fetchTopCoins() {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCoins(data, 'Top Coins', 'top-coins');
        })
        .catch(error => {
            console.error('Error fetching top coins:', error);
            alert('Error fetching top coins. Please try again later.');
        });
}

// Function to fetch trending coins
function fetchTrendingCoins() {
    const url = `https://api.coingecko.com/api/v3/search/trending`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const trendingCoinIDs = data.coins.slice(0, 5).map(coin => coin.item.id).join(',');
            return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${trendingCoinIDs}`);
        })
        .then(response => response.json())
        .then(data => {
            displayCoins(data, 'Trending Coins', 'trending-coins');
        })
        .catch(error => {
            console.error('Error fetching trending coins:', error);
            alert('Error fetching trending coins. Please try again later.');
        });
}

// Function to fetch new coins
function fetchNewCoins() {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=5&page=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCoins(data, 'New Coins', 'new-coins');
        })
        .catch(error => {
            console.error('Error fetching new coins:', error);
            alert('Error fetching new coins. Please try again later.');
        });
}

// Function to display coins in a specified section
function displayCoins(coins, sectionTitle, sectionID) {
    const container = document.getElementById(sectionID);
    container.innerHTML = '';

    // Add section title
    const title = document.createElement('h5');
    title.textContent = sectionTitle;
    container.appendChild(title);

    coins.forEach(coin => {
        const card = document.createElement('div');
        card.classList.add('card', 'bg-light', 'rounded', 'mb-4');

        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title"><img src="${coin.image}" alt="${coin.name} logo" width="20"> ${coin.name} (${coin.symbol.toUpperCase()})</h5> <!-- Added coin logo -->
                <p class="card-text">Price: $${coin.current_price}</p>
                <p class="card-text">Market Cap: $${coin.market_cap}</p>
            </div>
        `;

        container.appendChild(card);
    });
}
