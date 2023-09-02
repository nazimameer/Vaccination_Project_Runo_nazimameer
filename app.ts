const express  = require('express');
const cors = require('cors');
const http = require('http');
const { dbconnect } = require('./src/config/config') 
const app = express();
require('dotenv').config();
app.use(cors())
const server = http.createServer(app);




dbconnect()
const port = 8000;
server.listen(port, () => `Server running on port: ${port}`)