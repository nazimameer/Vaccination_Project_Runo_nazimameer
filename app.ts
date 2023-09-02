const express  = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors())
const server = http.createServer(app);






const port = 8000;
server.listen(port, () => `Server running on port: ${port}`)