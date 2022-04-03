const { check } = require("express-validator");
const { validateResult } = require("../middlewares/user-validator");
const { Category } = require("../models");

const categoryNotExists = async (id = '') => {
    const category = await Category.findById(id);
    if( ! category ) {
        throw new Error(`La id [${id}] no existe.`);
    }
}

const categoryExists = async (name = '') => {
    const category = await Category.find({ name });
    if( category ) {
        throw new Error(`La categoría [${name}] ya existe.`);
    }
} 

const validatorCreateCategory = [
    check('name', 'El nombre es requerido.').not().isEmpty(),
    check('name').custom( categoryExists ),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validatorGetCategory = [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( categoryNotExists ),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validatorUpdateCategory = [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( categoryNotExists ),
    check('name').not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validatorDeleteCategory = [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( categoryNotExists ),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = {
    validatorCreateCategory,
    validatorGetCategory,
    validatorUpdateCategory,
    validatorDeleteCategory
}