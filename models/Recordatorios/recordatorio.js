const { Schema, model } = require("mongoose");

const recordatorioModel = new Schema({

    usuario: [{
        type: Schema.Types.ObjectId, ref: "Usuarios", required: true
    }],
    metas: {
        type: Schema.Types.ObjectId, ref: "Metas", required: true,
    },
    titulo: {
        type: String,
        unique: true,
        required: true,
    },
    mensaje: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    dias: [{
        day: {
            type: String,
            required: true,
        },
        activo: {
            type: Boolean,
            default: false,
        }
    }],
    // horario: {
    //     type: String,
    //     required: false, // Para prueba en false
    // },

    global: {
        type: Boolean,
        default: false,
    },
}, { timestamp: true });

module.exports = model("Recordatorio", recordatorioModel);