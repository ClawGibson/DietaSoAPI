const { Schema, model } = require('mongoose');

const estadisticasHuellaSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    huellaHidricaTotal: { type: Number, default: 0 },
    huellaCarbonoTotal: { type: Number, default: 0 },
    puntajeEcologicoSostenible: { type: Number, default: 0 },
    puntosEconomiaDeFichas: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

estadisticasHuellaSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

estadisticasHuellaSchema.set('toJSON', {
  virtuals: true,
});

module.exports = model('EstadisticasHuella', estadisticasHuellaSchema);
