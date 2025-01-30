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

function displayCryptoData(crypto) {
  const container = document.getElementById('crypto-result-container');
  
  container.innerHTML = '';

  const resultDiv = document.createElement('div');
  resultDiv.id = 'crypto-result';
  resultDiv.classList.add('col-12', 'p-3', 'bg-white', 'rounded');
  
  resultDiv.innerHTML = `
      <h3>${crypto.name} (${crypto.symbol.toUpperCase()})</h3>
      <p>Current Price: $${crypto.current_price}</p>
      <p>Market Cap: $${crypto.market_cap}</p>
      <p>24h Change: ${crypto.price_change_percentage_24h.toFixed(2)}%</p>
  `;
  
  container.appendChild(resultDiv);
}
