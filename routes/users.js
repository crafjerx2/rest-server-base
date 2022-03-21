const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

const userController = new UserController();

router.get('/', userController.index);

router.post('/', userController.store );

router.put('/', userController.update);

router.delete('/:id', userController.destroy);

router.patch('/', userController.updatePath);


module.exports = router;
