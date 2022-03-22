const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.MONGO_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada')

    } catch (error) {
        console.log(error);
        throw new Error('Error de conecction de la base de datos');
    }
}

module.exports = {
    dbConnection
}
