const { Router } = require('express');
const { 
    getAllUsers, 
    getUser, 
    createUser,
    updateUser,
    deleteUser } = require('../controllers/user');
const { hasRol, isAdmin, validateJWT } = require('../middlewares/');

const { 
    validatorCreateUser, 
    validatorUpdateUser,
    validatorDeleteUser, 
    validatorGeteUser} = require('../validations/users');

const router = Router();

router.get('/', getAllUsers);

router.get('/:id', validatorGeteUser, getUser);

router.post('/', validatorCreateUser, createUser );

router.put('/:id', validatorUpdateUser, updateUser);

router.delete('/:id', 
    validatorDeleteUser, 
    validateJWT, 
    isAdmin,
    hasRol('DEV_ROL', 'SALE_ROL'), 
    deleteUser);

module.exports = router;
