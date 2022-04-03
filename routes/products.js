const { Router } = require('express');

const { 
    getAllProducts, 
    getProduct, 
    createProduct, 
    updateCateogory, 
    deleteCateogory} = require('../controllers/product');
    
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdmin } = require('../middlewares/user-rol');

const { 
    validatorGetproduct, 
    validatorDeleteproduct,
    validatorUpdateproduct,
    validatorCreateproduct } = require('../validations/product');

const router = Router();

router.get('/', getAllProducts);

router.get('/:id', validatorGetproduct, getProduct);

router.post('/', validateJWT, validatorCreateproduct, createProduct);


router.put('/:id', validateJWT, validatorUpdateproduct, updateCateogory);

router.delete('/:id', validateJWT, validatorDeleteproduct, deleteCateogory) 

module.exports = router;
