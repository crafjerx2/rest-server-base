const jwt  = require("jsonwebtoken");
const { userExists, userActive } = require("../helpers/user-commons");
const User = require('../models/user');

const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en el request.'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userAuth = await User.findById(uid);
       
        if( !userExists(userAuth) ) {
            return res.status(401).json({
                msg: 'Token no válido. user not exist'
            });
        }

        if( !userActive(userAuth) ) {
            return res.status(401).json({
                msg: 'Token no válido. user not active'
            });
        }

        req.userAuth = userAuth;
        next();
    } catch (error) {
        console.log( error );
        res.status(401).json({
            msg: 'Token no válido. catch'
        });
    }


}

module.exports = {
    validateJWT
}
