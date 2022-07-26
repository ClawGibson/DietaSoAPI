const { Schema, model } = require('mongoose');

const recordatorioModel = new Schema(
    {
        usuarios: [
            { type: Schema.Types.ObjectId, ref: 'InformacionUsuarios', required: true },
        ],
        usuariosConfirmados: [
            { type: Schema.Types.ObjectId, ref: 'InformacionUsuarios', required: true },
        ],
        metas: { type: Schema.Types.ObjectId, ref: 'Metas', required: false },
        titulo: { type: String, required: true, unique: false },
        mensaje: { type: String, required: true },
        categoria: { type: String, required: false },
        fecha: [{ type: Date }],
        hora: [{ type: Date }],
        global: { type: Boolean, default: false },
    },
    { timestamp: true }
);

module.exports = model('Recordatorio', recordatorioModel);
