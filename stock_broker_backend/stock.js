const supportedStocks = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];

function startStockUpdates(io) {
    setInterval(() => {
        supportedStocks.forEach(stock => {
            const price = (Math.random() * 1000).toFixed(2);
            io.to(stock).emit('priceUpdate', { stock, price });
        });
    }, 1000);
}

module.exports = { startStockUpdates, supportedStocks };
