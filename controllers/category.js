const { Category } = require('../models');

const getAllCategories = async (req, res) => {
    const { limit = 5, skip = 0 } = req.query;
    const conditions = { status: true }

    const [ count, categories ] = await Promise.all([
        Category.countDocuments(conditions),
        Category.find(conditions)
            .limit( Number(limit) )
            .skip( Number(skip) )
            .populate('user', 'name')
    ]);

    res.json({
        count,
        categories,
    })
}

const getCategory = async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id).populate('user', 'name');

    res.json({
        category
    })
}

const createCategory = async (req, res) => {
    const name = req.body.name.toUpperCase();

    const category = new Category({
        name,
        user: req.userAuth._id}
    );
    await category.save();

    res.json({
        category
    })
}

const updateCateogory = async (req, res) => {
   const { id } = req.params;
   const { status, user, ...data }  = req.body;
   
   data.name = req.body.name.toUpperCase();
   data.user = req.userAuth._id;
  
   const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.json({
        category
    });
}

const deleteCateogory = async (req, res) => {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true});
 
     res.json({
         category
     });
}

module.exports = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCateogory,
    deleteCateogory
}
