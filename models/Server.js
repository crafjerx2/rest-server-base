const express = require('express')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World!')
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`La aplicación está escuchando en el puerto ${this.port}`)
        })
    }

}


module.exports = Server;
