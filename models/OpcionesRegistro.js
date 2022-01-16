const { Schema, model } = require('mongoose');

const opcionesRegistro = new Schema({
    registroLibre: {
        type: Boolean,
        required: true,
        default: false,
        unique: true,
    },
});

opcionesRegistro.virtual('id').get(function () {
    return this._id.toHexString();
});

opcionesRegistro.set('toJSON', {
    virtuals: true,
});

module.exports = model('OpcionesRegistro', opcionesRegistro);
