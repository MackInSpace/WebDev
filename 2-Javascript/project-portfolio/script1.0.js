const searchInput = document.getElementById('search-input');
const suggestionsContainer = document.getElementById('suggestions');

let cryptoData = [];

// Fetch cryptocurrency data using CoinGecko API
async function fetchCryptoData() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets', {
      qs: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 250, page: 1, sparkline: false },
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    cryptoData = await response.json();
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
  }
}

// Call the fetch function on page load
fetchCryptoData();

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  suggestionsContainer.innerHTML = '';

  if (query.length === 0) {
    return;
  }

  const filteredCryptos = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(query) || crypto.symbol.toLowerCase().includes(query)
  );

  if (filteredCryptos.length > 0) {
    filteredCryptos.slice(0, 10).forEach(crypto => {
      const suggestionItem = document.createElement('div');
      suggestionItem.classList.add('suggestion-item');

      const cryptoImage = document.createElement('img');
      cryptoImage.src = crypto.image;
      cryptoImage.alt = crypto.name;

      const cryptoName = document.createElement('span');
      cryptoName.textContent = `${crypto.name} (${crypto.symbol.toUpperCase()})`;

      suggestionItem.appendChild(cryptoImage);
      suggestionItem.appendChild(cryptoName);
      suggestionsContainer.appendChild(suggestionItem);

      suggestionItem.addEventListener('click', () => {
        searchInput.value = `${crypto.name} (${crypto.symbol.toUpperCase()})`;
        suggestionsContainer.innerHTML = '';
      });
    });
  } else {
    const noResults = document.createElement('div');
    noResults.classList.add('no-results');
    noResults.textContent = 'No cryptocurrencies found.';
    suggestionsContainer.appendChild(noResults);
  }
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
    suggestionsContainer.innerHTML = '';
  }
});
