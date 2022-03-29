const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { validatorLogin, validatorGoogleSingIn } = require('../validations/auth');

const router = Router();

router.post('/login', validatorLogin, login);

router.post('/google', validatorGoogleSingIn, googleSignIn);

module.exports = router;
