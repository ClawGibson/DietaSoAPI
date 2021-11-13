const { Schema, model } = require('mongoose');

const puntosPorEjercicioSchema = new Schema({
    ejercicio: {
        type: Schema.Types.ObjectId,
        ref: 'Ejercicios',
        required: true,
    },
    grupo: { type: String, required: true },
    duracion: { type: String, required: true },
    intensidad: { type: String, required: true },
    puntos: { type: Number, required: true },
});

module.exports = model('PuntosPorEjercicio', puntosPorEjercicioSchema);
