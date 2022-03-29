const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authRoutePath = '/api/auth';
        this.userRoutePath = '/api/users';
        
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authRoutePath, require('../routes/auth'));
        this.app.use(this.userRoutePath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`La aplicación está escuchando en el puerto ${this.port}`)
        })
    }

}


module.exports = Server;