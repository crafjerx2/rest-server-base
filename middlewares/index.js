const userRol = require('../middlewares/user-rol');
const validarJWT = require('../middlewares/validate-jwt');

module.exports = {
    ...userRol,
    ...validarJWT
}
