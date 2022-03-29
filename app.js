const Server = require('./config/Server');

require('dotenv').config();

const server = new Server();

server.listen();
