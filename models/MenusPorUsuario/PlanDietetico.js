const { Schema, model } = require('mongoose');

const planDieteticoSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    plan: [{ type: Schema.Types.ObjectId, ref: 'MenusPorUsuario' }],
});

module.exports = model('PlanDietetico', planDieteticoSchema);
