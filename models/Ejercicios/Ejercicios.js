const { Schema, model } = require('mongoose');

const ejerciciosSchema = new Schema({
    nombre: { type: String, unique: true, required: true },
    categoria: { type: String, required: true }, // Fuerza o resistencia
    imagen: { type: String, required: false },
});

module.exports = model('Ejercicios', ejerciciosSchema);
