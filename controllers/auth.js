const bcrypt = require("bcryptjs");
const User = require('../models/user');
const { genarateJWT } = require('../helpers/genrate-jwt');


const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        //email no exists
        if( !user ) {
            res.status(400).json({
                msg: "Usuario / password incorrecto"
            });
        }

        //usuario activo
        if( ! user.status ) {
            res.status(400).json({
                msg: "Usuario / password incorrecto"
            });
        }

        //password in valid
        const passwordValid = await bcrypt.compareSync(password, user.password);
        if( !passwordValid ) {
            res.status(400).json({
                msg: "Usuario / password incorrecto"
            });
        }

        //Generate JWT
        const token = await genarateJWT(user.id);

        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            msg: 'Algo salió mal, favor contactar al administrador'
        })
        
    }
   
}

module.exports = {
    login
}