const { check } = require("express-validator");
const { validateResult } = require("../middlewares/user-validator");
const Role = require('../models/role');
const User = require('../models/user');

const isRole = async (name = '') => {
    const rol = await Role.findOne({ name });
    if( !rol ) {
        throw new Error(`El rol ${name} no es válido.`);
    }
};

const emailExists = async(email = '') => {
    const user = await User.findOne({ email });
    if( user ) {
        throw new Error(`El email ${email} esta registrado.`);
    }
}

const userExists = async(id = '') => {
    const user = await User.findById(id);
    if( !user ) {
        throw new Error(`El id ${id} no existe.`);
    }
}


const validatorCreateUser = [
    check('name', 'El nombre es obligatorio.').exists().not().isEmpty(),
    check('email', 'El correo es obligatorio.').exists().not().isEmpty(),
    check('email', 'El correo no es válido.').isEmail(),
    check('email').custom( emailExists ),
    check('password', 'La contraseña es obligatoria.').exists().not().isEmpty(),
    check('password', 'La contraseña debe ser con más de 6 caracteres').isLength({ min: 6 }),
    check('rol', 'El rol  es obligatorio.').exists().not().isEmpty(),
    check('rol').custom( isRole ),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validatorUpdateUser = [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( userExists ),
    check('rol').custom( isRole ),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validatorAllUsers = [
    check('limit', 'El limite debe ser un valor númerico').isNumeric(),
    check('skip', 'El skip debe ser un valor númerico').isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validatorDeleteUser = [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( userExists ),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validatorCreateUser, validatorUpdateUser, validatorDeleteUser }