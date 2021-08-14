const { Schema, model } = require("mongoose");

const recordatorioModel = new Schema({
    usuario: {
        type: Schema.Types.ObjectId, ref: "Usuarios", required: true,
    },
    metas: {
        type: Schema.Types.ObjectId, ref: "Metas", required: true,
    },
    titulo: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    dias: [
        { lunes: { type: boolean, default: false } },
        { martes: { type: boolean, default: false } },
        { miercoles: { type: boolean, default: false } },
        { jueves: { type: boolean, default: false } },
        { viernes: { type: boolean, default: false } },
        { sabado: { type: boolean, default: false } },
        { domingo: { type: boolean, default: false } },
    ],
    horario: {
        type: String,
        required: true,
    },
    global: {
        type: boolean,
        default: false,
    },
}, { timestamp: true });

module.exports = model("RecordatoriosModelo", recordatorioModel);