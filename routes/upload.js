const { Router } = require('express');

const { loadFile, updateImage }  = require('../controllers/upload');
const { validatorUpdateImage } = require('../validations/upload');

const router = Router();

router.post('/', loadFile);
router.put('/:colection/:id', validatorUpdateImage, updateImage);

module.exports = router;
