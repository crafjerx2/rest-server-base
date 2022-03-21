const { response } = require('express');

class UserController {

    index(req, res = response) {
        res.json({
            'msg': 'get API'
        });
    }

    store = (req, res = response) => {
        res.json({
            'msg': 'post API'
        });
    }

    update = (req, res = response) => {
        res.json({
            'msg': 'put API'
        });
    }

    destroy = (req, res = response) => {
        res.json({
            'msg': 'delete API'
        });
    }

    updatePath = (req, res = response) => {
        res.json({
            'msg': 'patch API'
        });
    }

}



module.exports = UserController;
