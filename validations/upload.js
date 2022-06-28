const { check } = require("express-validator");
const { validateResult } = require("../middlewares/user-validator");

const colectionAllowed = ['users', 'products'];

const hasColectionAllowed = (colection) => {
    return colectionAllowed.includes(colection);
    
}


const validatorUpdateImage = [
    check('id', 'El id no es válido').isMongoId(),
    check('colection', `La colección no es permitida - ${colectionAllowed}`).custom( hasColectionAllowed ),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { 
    validatorUpdateImage
}