const { check } = require("express-validator");
const { validateResult } = require("../middlewares/user-validator");

const validatorLogin = [
    check('email', 'El correo no es válido.').isEmail(),
    check('password', 'La contraseña es es obligatoria').not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validatorGoogleSingIn = [
    check('id_token', 'El token es requerido.').not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]
;


module.exports = {
    validatorLogin,
    validatorGoogleSingIn
}
