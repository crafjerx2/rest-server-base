const { response, request } = require('express');

const User = require('../models/User');

class UserController {

    index(req = request, res = response) {

        const query = req.query;

        res.json({
            'msg': 'get API',
            query
        });
    }

    store = (req, res = response) => {
      //  const {name, email, password, img, rol} = req.body;
      const { body } = req;

        res.json({
           body
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
