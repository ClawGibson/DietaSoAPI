const { Schema, model } = require('mongoose');

const estadisticasIMCSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true,
    },
    realizacionActividadFisicaMinutos: { type: Number },
    porcentajeGrasaCorporal: { type: Number, default: 0 },
    porcentajeMasaMuscular: { type: Number, default: 0 },
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
