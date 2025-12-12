const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(cors);
dotenv.config();

const server = http.createServer(app);

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Node app running on port ${PORT}`));

