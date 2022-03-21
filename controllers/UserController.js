const { response, request } = require('express');

class UserController {

    index(req = request, res = response) {

        const query = req.query;

        res.json({
            'msg': 'get API',
            query
        });
    }

    store = (req, res = response) => {
        const {name, age} = req.body;

        res.json({
            'msg': 'post API',
            name,
            age
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
