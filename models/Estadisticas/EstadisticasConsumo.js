const { Schema, model } = require('mongoose');

const estadisticasConsumoSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    frutasVegetales: { type: Number, default: 0 },
    alimentosMexicanos: { type: Number, default: 0 },
    cerealesIntegrales: { type: Number, default: 0 },
    leguminosas: { type: Number, default: 0 },
    lacteos: { type: Number, default: 0 },
    semillasGrasasSaludables: { type: Number, default: 0 },
    huevo: { type: Number, default: 0 },
    pescadoMariscos: { type: Number, default: 0 },
    pollo: { type: Number, default: 0 },
    carnesRojasProcesadas: { type: Number, default: 0 },
    ultraProcesados: { type: Number, default: 0 },
    azucar: { type: Number, default: 0 },
    grasaSaturada: { type: Number, default: 0 },
    grasaTrans: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

estadisticasConsumoSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

estadisticasConsumoSchema.set('toJSON', {
  virtuals: true,
});

module.exports = model('EstadisticasConsumo', estadisticasConsumoSchema);
