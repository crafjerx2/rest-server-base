const {Schema, mongoose} = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    description: { type: String },
    avaialable: { type: Boolean, default: true },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    'user': {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    'category': {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        default: 0
    }
});

productSchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    return data;
}

module.exports = mongoose.model('Product', productSchema);
