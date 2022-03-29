var jwt = require('jsonwebtoken');

const genarateJWT = (uid = '') => {
    return new Promise( (resolve, reject) => {
        const payrol = {uid};
        jwt.sign(payrol, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if( err ) {
                console.log( err );
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    genarateJWT
}
