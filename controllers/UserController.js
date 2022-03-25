const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

class UserController {
  index =  async (req = request, res = response) => {
    const {limit = 5, skip = 0} = req.query;
    const conditions = { status: true }

    const [ count, users ] = await Promise.all([
        User.countDocuments(conditions),
        User.find(conditions)
            .limit( Number(limit) )
            .skip( Number(skip) )
    ]);

    res.json({
      count,
      users
    });
  }

  store = async (req, res = response) => {
    const { name, email, password, img, rol } = req.body;

    const user = new User({ name, email, password, img, rol });

    //encript password
    const salt = bcrypt.genSaltSync();
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({
      user,
    });
  };

  update = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...data } = req.body;
    
    if( password ) {
        const salt = bcrypt.genSaltSync();
        data.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data);

    res.json({
        user
    });

  };

  destroy = async (req = request, res = response) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {status: false});

    res.json(user);
  };

  updatePath = (req, res = response) => {
    res.json({
      msg: "patch API",
    });
  };
}

module.exports = UserController;
