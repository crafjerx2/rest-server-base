const { Product, Category } = require('../models');

const getAllProducts = async (req, res) => {
    const { limit = 5, skip = 0 } = req.query;
    const conditions = { status: true }

    const [ count, products ] = await Promise.all([
        Product.countDocuments(conditions),
        Product.find(conditions)
        .populate('user', 'name')
        .populate('category', 'name')
            .limit( Number(limit) )
            .skip( Number(skip) )
    ]);

    res.json({
        count,
        products,
    })
}

const getProduct = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');

    res.json({
        product
    })
}

const createProduct = async (req, res) => {
    const { name, category: categoryName, description, price } = req.body;

    //find category
    const category = await Category.findOne({name: categoryName});
    const data = {
        name,
        description,
        price,
        user: req.userAuth._id,
        category: category._id
    }

    const product = new Product(data);
    await product.save();

    res.json(product)
}

const updateCateogory = async (req, res) => {
   const { id } = req.params;
   const { status, user, ...data }  = req.body;
   
   data.name = req.body.name.toUpperCase();
   data.user = req.userAuth._id;
  
   const product = await Product.findByIdAndUpdate(id, data, {new: true});

    res.json({
        product
    });
}

const deleteCateogory = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, {status: false}, {new: true});
 
     res.json({
         product
     });
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateCateogory,
    deleteCateogory
}
