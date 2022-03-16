const { Schema, model } = require('mongoose');

const opcionesEdicion = new Schema({
    informacionPersonal: {
        type: Boolean,
        required: true,
        default: false,
        unique: true,
    },
    circunferencia: {
        type: Boolean,
        required: true,
        default: false,
        unique: true,
    },
    camposCorporales: {
        type: Boolean,
        required: true,
        default: false,
        unique: true,
    },
    estadoGeneral: {
        type: Boolean,
        required: true,
        default: false,
        unique: true,
    },
    exposicionSolar: {
        type: Boolean,
        required: true,
        default: false,
        unique: true,
    },
    gastroIntestinal: {
        type: Boolean,
        required: true,
        default: false,
        unique: true,
    },
    bioquimicos: {
        type: Boolean,
        required: true,
        default: false,
        unique: true,
    },
    clinicos: { type: Boolean, required: true, default: false, unique: true },
    sueno: { type: Boolean, required: true, default: false, unique: true },
});

opcionesEdicion.virtual('id').get(function () {
    return this._id.toHexString();
});

opcionesEdicion.set('toJSON', {
    virtuals: true,
});

module.exports = model('OpcionesEdicion', opcionesEdicion);
