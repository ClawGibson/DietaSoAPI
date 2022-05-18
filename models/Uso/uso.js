const { Schema, model } = require('mongoose');

const usoAppModel = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'InformacionUsuarios',
        required: true,
    },
    fecha: { type: Date, required: true, default: Date.now },
    estado: { type: String, required: true },
});

module.exports = model('UsoApp', usoAppModel);
