// Fetch top 100 cryptocurrencies by market cap from CoinGecko API
async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
    }
}

// Function to load coins dynamically
async function loadCoins() {
    const coins = await fetchCryptoData();
    const coinList = document.getElementById('coin-list');
    const loadingSpinner = document.getElementById('loading-spinner');

    if (coins && coins.length > 0) {
        loadingSpinner.style.display = 'none';
        coinList.style.display = 'flex';
        coins.forEach(coin => {
            const coinDiv = document.createElement('div');
            coinDiv.className = 'coin';
            coinDiv.innerHTML = `
                <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
                <p>Price: $${coin.current_price.toLocaleString()}</p>
                <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
            `;
            coinList.appendChild(coinDiv);
        });
    } else {
        loadingSpinner.innerText = 'Failed to load data';
    }
}
// Function to load news dynamically
function loadNews() {
    const newsList = document.getElementById('news-list');
    news.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `<a href="${article.link}">${article.title}</a>`;
        newsList.appendChild(newsItem);
    });
}
// Load content on page load
window.onload = function() {
    loadCoins();
};
