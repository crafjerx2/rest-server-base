const { Router } = require('express');
const { login } = require('../controllers/auth');
const { validatorLogin } = require('../validations/auth');

const router = Router();

router.post('/login', validatorLogin, login);

module.exports = router;
