const { Router } = require('express');
const { 
    getAllCategories, 
    getCategory, 
    createCategory, 
    updateCateogory, 
    deleteCateogory} = require('../controllers/category');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdmin } = require('../middlewares/user-rol');
const { 
    validatorCreateCategory,
    validatorGetCategory,
    validatorUpdateCategory,
    validatorDeleteCategory} = require('../validations/category');


const router = Router();

router.get('/', getAllCategories);

router.get('/:id', validatorGetCategory, getCategory);

router.post('/', validateJWT, validatorCreateCategory, createCategory);

router.put('/:id', validateJWT, validatorUpdateCategory, updateCateogory);

router.delete('/:id', 
            validateJWT,
            isAdmin, 
            validatorDeleteCategory, 
            deleteCateogory);

module.exports = router;
