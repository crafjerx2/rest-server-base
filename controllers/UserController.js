const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

class UserController {

    index(req = request, res = response) {

        const query = req.query;

        res.json({
            'msg': 'get API',
            query
        });
    }

    store = async (req, res = response) => {
      const {name, email, password, img, rol} = req.body;

      const user = new User({name, email, password, img, rol});

      //check email

      //encript password
      const salt = bcrypt.genSaltSync();
      user.password = await bcrypt.hash(password, salt);

      await user.save();

        res.json({
           user
        });
    }

    update = (req, res = response) => {
        res.json({
            'msg': 'put API'
        });
    }

    destroy = (req = request, res = response) => {

        const { id } = req.params;

        res.json({
            'msg': 'delete API',
            id
        });
    }

    updatePath = (req, res = response) => {
        res.json({
            'msg': 'patch API'
        });
    }

}



module.exports = UserController;
