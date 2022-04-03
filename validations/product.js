const { check } = require("express-validator");
const { validateResult } = require("../middlewares/user-validator");
const { Product, Category } = require("../models");

const productNotExists = async (id = '') => {
    const product = await Product.findById(id);
    if( ! product ) {
        throw new Error(`El id [${id}] no existe.`);
    }
}

const productExists = async (name = '') => {
    const product = await Product.findOne({ name });
    if( product ) {
        throw new Error(`El producto [${product.name}] ya existe.`);
    }
} 

const categoryNotExists = async (categoryName = '') => {
    const category = await Category.findOne({name: categoryName});
    if( ! category ) {
        throw new Error(`La categoría [${id}] no existe.`);
    }
}

const validatorCreateproduct = [
    check('name', 'El nombre es requerido.').not().isEmpty(),
    check('category', 'La categoría es requerida.').not().isEmpty(),
    check('category').custom(  categoryNotExists ),
    check('description', 'La descripcion es requerida.').not().isEmpty(),
    check('price', 'El precio es requerido.').not().isEmpty(),
    check('price', 'El precio debe ser númerico').isNumeric(),
    check('name').custom( productExists ),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validatorGetproduct = [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( productNotExists ),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validatorUpdateproduct = [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( productNotExists ),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validatorDeleteproduct = [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( productNotExists ),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = {
    validatorCreateproduct,
    validatorGetproduct,
    validatorUpdateproduct,
    validatorDeleteproduct
}
