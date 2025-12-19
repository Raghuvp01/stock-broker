const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const { startStockUpdates, supportedStocks } = require('./stock');

const app = express();
app.use(cors());
dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('subscribe', (stock) => {
        if (supportedStocks.includes(stock)) {
            socket.join(stock);
            console.log(`User ${socket.id} subscribed to ${stock}`);
        }
    });

    socket.on('unsubscribe', (stock) => {
        socket.leave(stock);
        console.log(`User ${socket.id} unsubscribed from ${stock}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

startStockUpdates(io);

const PORT = 8000;

server.listen(PORT, () => console.log(`Node app running on port ${PORT}`));

