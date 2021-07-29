const { Schema, model } = require('mongoose');

const economiaFichasSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    alimento: { type: Schema.Types.ObjectId, ref: 'Alimentos', required: true },
    puntosTotales: { type: Number, default: 0, required: true },
    puntosObtenidosPorAlimento: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
  }
);

economiaFichasSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

economiaFichasSchema.set('toJSON', {
  virtuals: true,
});

module.exports = model('EconomiaFichas', economiaFichasSchema);
