const { User, Category, Product } = require('../models')
const { ObjectId } = require('mongoose').Types;

const colectionsAllowed = ["users", "categories", "products", "roles"];

const searchUsers = async (term = '', res) => {
    const isMongoId = ObjectId.isValid(term);

    if( isMongoId ) {
        const user = await User.findById(term);
        return res.json({
            results: user ? [user] : []
        })
    }

    const regex = new RegExp(term, 'i');
    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}]
    })

    return res.json({
        results: users
    })
}

const searchCategories = async (term = '', res) => {
    const isMongoId = ObjectId.isValid(term);

    if( isMongoId ) {
        const category = await Category.findById(term);
        return res.json({
            results: category ? [category] : []
        })
    }

    const regex = new RegExp(term, 'i');
    const categories = await Category.find({name: regex, status: true});

    return res.json({
        results: categories
    })
}

const searchProducts = async (term = '', res) => {
    const isMongoId = ObjectId.isValid(term);

    if( isMongoId ) {
        const product = await Product.findById(term)
                                    .populate('category', 'name');
        return res.json({
            results: product ? [product] : []
        })
    }

    const regex = new RegExp(term, 'i');
    const products = await Product.find({name: regex, status: true})
                                    .populate('category', 'name');

    return res.json({
        results: products
    })
}

const search = (req, res) => {
  const { colection, term } = req.params;

  if (!colectionsAllowed.includes(colection)) {
    return res.status(400).json({
      msg: `Las colecciones permitadas son [${colectionsAllowed}]`,
    });
  }

  switch (colection) {
    case 'users':
       searchUsers(term, res);      
    break;
    case 'categories':
        searchCategories(term, res);
        break
    case 'products':
        searchProducts(term, res);
        break
    case 'roles':
          
        break
      
    default:
        break;
  }


};

module.exports = search;
