const { Schema, model } = require('mongoose');

const recetasSchema = new Schema({
    url: { type: String, required: true },
    titulo: { type: String, required: true },
    categoria: { type: String, required: true },
    destacado: { type: Boolean, required: true, default: false },
});

recetasSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

recetasSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('Recetas', recetasSchema);
