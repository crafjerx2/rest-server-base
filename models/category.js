const {Schema, mongoose} = require('mongoose');

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    'user': {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }   
});

categorySchema.methods.toJSON = function() {
    const { __v, status, ...category } = this.toObject();
    return category;
}

module.exports = mongoose.model('Category', categorySchema);
