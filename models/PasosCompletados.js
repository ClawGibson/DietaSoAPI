const { Schema, model } = require('mongoose');

const pasosCompletados = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true,
        unique: true,
    },
    paso1: { type: Boolean, required: true, default: false },
    paso2: { type: Boolean, required: true, default: false },
    paso3: { type: Boolean, required: true, default: false },
    paso4: { type: Boolean, required: true, default: false },
    paso5: { type: Boolean, required: true, default: false },
});

pasosCompletados.virtual('id').get(function () {
    return this._id.toHexString();
});

pasosCompletados.set('toJSON', {
    virtuals: true,
});

module.exports = model('PasosCompletados', pasosCompletados);
