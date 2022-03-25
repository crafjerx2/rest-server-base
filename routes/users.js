const { Router } = require('express');
const UserController = require('../controllers/UserController');
const { 
    validatorCreateUser, 
    validatorUpdateUser,
    validatorDeleteUser } = require('../validations/users');

const router = Router();

const userController = new UserController();

router.get('/', userController.index);

router.post('/', validatorCreateUser, userController.store );

router.put('/:id', validatorUpdateUser, userController.update);

router.delete('/:id', validatorDeleteUser, userController.destroy);

module.exports = router;
