const { Schema, model } = require('mongoose');

const estadisticasIMCSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    peso: { type: Number, default: 0 },
    IMC: { type: Number, default: 0 },
    porcentajeGrasaCorporal: { type: Number, default: 0 },
    porcentajeMasaMuscular: { type: Number, default: 0 },
    actividadFisica: { type: String, default: 'Ninguna' },
  },
  {
    timestamps: true,
  }
);

estadisticasIMCSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

estadisticasIMCSchema.set('toJSON', {
  virtuals: true,
});

module.exports = model('EstadisticasIMC', estadisticasIMCSchema);