const { Schema, model } = require('mongoose');

const piramideSchema = new Schema({
    nivel: { type: String, required: true },
    url: { type: String, required: true },
});

module.exports = model('Piramide', piramideSchema);
