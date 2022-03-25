const { Schema, model } = require('mongoose');

const roleSchema = Schema({
    name: {
        type: String,
        require: [true, 'El rol es obligatorio']
    }
});

module.exports = model('Role', roleSchema);
