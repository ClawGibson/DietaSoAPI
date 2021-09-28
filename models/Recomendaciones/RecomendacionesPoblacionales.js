const { Schema, model } = require('mongoose');

const RecomendacionesPoblacionalesSchema = new Schema({
    alimento: { type: Schema.Types.ObjectId, ref: 'Alimentos', required: true },
    grupoId: { type: String, required: true },
    consumo: { type: String, required: true },
    porcionRecomendada: { type: String, required: true },
    porcionMinima: { type: String, required: true },
    porcionMaxima: { type: String, required: true },
});

RecomendacionesPoblacionalesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

RecomendacionesPoblacionalesSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model(
    'RecomendacionesPoblacionales',
    RecomendacionesPoblacionalesSchema
);
