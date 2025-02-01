document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn2").addEventListener("click", function () {
    const query = document
      .querySelector(".search-bar-long")
      .value.trim()
      .toLowerCase()
      .replace(/ /g, "-");
    console.log("Search Query:", query);

    if (query in cryptoIDs) {
      fetchCryptoData(cryptoIDs[query]);
    } else {
      alert("Unknown cryptocurrency ID. Please enter a valid name.");
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
  bitcoin: "bitcoin",
  btc: "bitcoin",
  ethereum: "ethereum",
  eth: "ethereum",
  dogecoin: "dogecoin",
  doge: "dogecoin",
  litecoin: "litecoin",
  ltc: "litecoin",
  ripple: "ripple",
  xrp: "ripple",
  // Add more as needed
};

// Function to fetch data from CoinGecko API
function fetchCryptoData(query) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${query}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data);
      if (data.length > 0) {
        displayCryptoData(data[0]);
      } else {
        alert("No data found for the entered query");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again later.");
    });
}

// Function to display cryptocurrency data
function displayCryptoData(crypto) {
  const container = document.getElementById("crypto-result-container");
  container.innerHTML = "";

  const resultDiv = document.createElement("div");
  resultDiv.id = "crypto-result";
  resultDiv.classList.add("col-12", "p-3", "bg-white", "rounded");

  resultDiv.innerHTML = `
        <h3><img src="${crypto.image}" alt="${crypto.name} logo" width="20"> ${
    crypto.name
  } (${crypto.symbol.toUpperCase()})</h3> <!-- Added coin logo -->
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
    .then((response) => response.json())
    .then((data) => {
      displayCoins(data, "Top Coins", "top-coins");
    })
    .catch((error) => {
      console.error("Error fetching top coins:", error);
      alert("Error fetching top coins. Please try again later.");
    });
}

// Function to fetch trending coins
function fetchTrendingCoins() {
  const url = `https://api.coingecko.com/api/v3/search/trending`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const trendingCoinIDs = data.coins
        .slice(0, 5)
        .map((coin) => coin.item.id)
        .join(",");
      return fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${trendingCoinIDs}`
      );
    })
    .then((response) => response.json())
    .then((data) => {
      displayCoins(data, "Trending Coins", "trending-coins");
    })
    .catch((error) => {
      console.error("Error fetching trending coins:", error);
      alert("Error fetching trending coins. Please try again later.");
    });
}

// Function to fetch new coins
function fetchNewCoins() {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=5&page=1`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayCoins(data, "New Coins", "new-coins");
    })
    .catch((error) => {
      console.error("Error fetching new coins:", error);
      alert("Error fetching new coins. Please try again later.");
    });
}

// Function to display coins in a specified section
function displayCoins(coins, sectionTitle, sectionID) {
  const container = document.getElementById(sectionID);
  container.innerHTML = "";

  // Add section title
  const title = document.createElement("h5");
  title.textContent = sectionTitle;
  container.appendChild(title);

  coins.forEach((coin) => {
    const card = document.createElement("div");
    card.classList.add("card", "bg-light", "rounded", "mb-4");

    card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title"><img src="${coin.image}" alt="${
      coin.name
    } logo" width="20"> ${
      coin.name
    } (${coin.symbol.toUpperCase()})</h5> <!-- Added coin logo -->
                <p class="card-text">Price: $${coin.current_price}</p>
                <p class="card-text">Market Cap: $${coin.market_cap}</p>
            </div>
        `;

    container.appendChild(card);
  });
}

// Mathias' Code Starts
let myData = [];
function fetchCryptoDataMathias() {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`;

  if (myData.length == 0) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log("API Response:", data.length);
        //console.log(data);
        if (data.length > 0) {
          data = data.filter((x) => x.market_cap_rank < 11); // get the first top 10 coins.

          //console.log("length ", data.length);
          myData = data;
        } else {
          alert("No data found for the entered query");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again later.");
      });
  }
}

// call the chart function
async function displayChartMathias() {
  chartSelected(myData);
}
// All charts

// Global Variables
let myChart = document.getElementById("myChart");

const myMenu = document.getElementById("dropDownMenu");
document.addEventListener("DOMContentLoaded", fetchCryptoDataMathias);
myMenu.addEventListener("change", displayChartMathias);

let activeChart = null; // Global variable to store the active chart

// Clear the canvas by destroying the previous chart instance
function clearCanvas() {
  if (activeChart) {
    activeChart.destroy();
  }
}

function chartSelected(data) {
  // variables
  const coinNames = data.map((coin) => coin.name); // string

  const currentPrice = data.map((coin) => coin.current_price); // number
  const circulatingSupply = data.map((coin) => coin.circulating_supply); // number
  const marketCap = data.map((coin) => coin.market_cap); // number
  const maxSupply = data.map((coin) => coin.max_supply); // number
  const priceChangePercentage24h = data.map(
    (coin) => coin.price_change_percentage_24h
  ); // number
  //   console.log("name ", coinNames);
  //   console.log("price ", currentPrice);

  const scatterData = marketCap.map((cap, index) => ({
    x: cap,
    y: maxSupply[index],
  }));

  const barColors = [
    "red",
    "green",
    "blue",
    "orange",
    "brown",
    "purple",
    "cyan",
    "magenta",
    "yellow",
    "pink",
  ];

  switch (myMenu.value) {
    case "Bar Chart":
      barChart(coinNames, marketCap, barColors);
      break;

    case "Doughnut":
      doughnutChart(coinNames, marketCap, barColors);
      break;

    case "Multiple Line Charts":
      mulLinesChart(
        currentPrice,
        circulatingSupply,
        marketCap,
        priceChangePercentage24h
      );
      break;

    case "Line Chart":
      lineChart(currentPrice, circulatingSupply);
      break;

    case "Pie Chart":
      pieChart(coinNames, marketCap, barColors);
      break;
    case "scatter":
      // Create scatter plot data

      scatterPlot(scatterData);
      break;
    default:
      clearCanvas();
      alert(`No chart is selected!`);
      break;
  }
}

// My functions for creating charts

// Bar char
function barChart(coinNames, marketCap, barColors) {
  clearCanvas();

  //create a bar chart
  activeChart = new Chart(myChart, {
    type: "bar",
    data: {
      labels: coinNames, // X-axis: Cryptocurrency Names
      datasets: [
        {
          label: "Market Capitalization (USD)",
          data: marketCap, // Y-axis: Market Cap
          backgroundColor: barColors,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Market Cap (in Billions USD)",
          },
        },
      },
    },
  });
}

// Doughnut chart
function doughnutChart(coinNames, marketCap, barColors) {
  clearCanvas();

  activeChart = new Chart("myChart", {
    type: "doughnut",
    data: {
      labels: coinNames, // Cryptocurrency Names
      datasets: [
        {
          label: "Market Capitalization (USD)",
          data: marketCap, // Market Cap values
          backgroundColor: barColors,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Market Capitalization of Top 10 Cryptocurrencies",
        },
      },
    },
  });
}

// Multiple Line Charts
function mulLinesChart(
  currentPrice,
  circulatingSupply,
  marketCap,
  priceChangePercentage24h
) {
  clearCanvas();
  activeChart = new Chart(myChart, {
    type: "line",
    data: {
      labels: currentPrice.map((price) => `$${price}`), // X-axis: Crypto Prices
      datasets: [
        {
          label: "Circulating Supply",
          data: circulatingSupply,
          borderColor: "red",
          fill: false,
          tension: 0.3,
        },
        {
          label: "Market Cap",
          data: marketCap,
          borderColor: "blue",
          fill: false,
          tension: 0.3,
        },
        {
          label: "24h Price Change (%)",
          data: priceChangePercentage24h,
          borderColor: "green",
          fill: false,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: "Current Price (USD)",
          },
        },
        y: {
          title: {
            display: true,
            text: "Values (Supply, Market Cap, 24h Change %)",
          },
        },
      },
    },
  });
}

// Line Chart
function lineChart(currentPrice, circulatingSupply) {
  clearCanvas();

  activeChart = new Chart("myChart", {
    type: "line",
    data: {
      labels: currentPrice, // X-axis: Crypto Prices
      datasets: [
        {
          label: "Circulating Supply vs Current Price",
          data: circulatingSupply, // Y-axis: Circulating Supply
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.2)",
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: "Current Price (USD)",
          },
        },
        y: {
          title: {
            display: true,
            text: "Circulating Supply",
          },
        },
      },
    },
  });
}

// Pie Chart
function pieChart(coinNames, marketCap, barColors) {
  // variables
  clearCanvas();

  //create a pie chart
  activeChart = new Chart("myChart", {
    type: "pie",
    data: {
      labels: coinNames, // Cryptocurrency Names
      datasets: [
        {
          label: "Market Capitalization (USD)",
          data: marketCap, // Market Cap values
          backgroundColor: barColors,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Market Capitalization of Top 10 Cryptocurrencies",
        },
      },
    },
  });
}

// Scatter plot
function scatterPlot(scatterData) {
  clearCanvas();

  activeChart = new Chart("myChart", {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Market Cap vs Max Supply",
          data: scatterData,
          pointBackgroundColor: "blue",
          pointRadius: 5,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: {
            display: true,
            text: "Market Cap (USD)",
          },
        },
        y: {
          title: {
            display: true,
            text: "Max Supply",
          },
        },
      },
    },
  });
}
