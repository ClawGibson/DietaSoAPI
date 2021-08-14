/** @format */

const { Schema, model } = require('mongoose');

const usuariosSchema = new Schema(
    {
        usuario: { type: String, required: true },
        nombre: { type: String, required: true },
        logros: { type: String, required: false },
        email: { type: String, required: true },
        contrasena: { type: String, required: true },
        esAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

usuariosSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    const { _id: id, ...result } = object;
    return { ...result, id };
});

usuariosSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

usuariosSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('Usuarios', usuariosSchema);
