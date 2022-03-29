const bcrypt = require("bcryptjs");
const User = require('../models/user');
const { genarateJWT } = require('../helpers/genrate-jwt');
const { googleVerify } = require("../helpers/google-verify");


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

const googleSignIn = async (req, res) => {
    const { id_token } = req.body;

    try {
        const {name, email, img} =  await googleVerify(id_token);
       
        let user = await User.findOne({email});
        console.log( user )
        if ( !user ) {
            const data = {
                name,
                email,
                img,
                password: ':p',
                google: true
            };

            user = new User(data);
            await user.save();
        }

        //si el usario esta en la DB
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado.'
            });
        }

        //Generate JWT
        const token = await genarateJWT(user.id);

        return res.json({
            user,
            token
        });


    } catch (error) {
        res.json({
            msg: 'Token Google no es válido.',
        });
    }    
}

module.exports = {
    login,
    googleSignIn
}