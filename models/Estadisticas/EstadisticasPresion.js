const { Schema, model } = require('mongoose');

const estadisticasPresion = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    presionArterialSistolica: { type: Number, min: 0, max: 300 },
    presionArterialDiastolica: { type: Number, min: 0, max: 300 },
  },
  { timeStamp: true }
);

estadisticasPresion.virtual('id').get(function () {
  return this._id.toHexString();
});

estadisticasPresion.set('toJSON', {
  virtuals: true,
});

module.exports = model('EstadisticasPresion', estadisticasPresion);
