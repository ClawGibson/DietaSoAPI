const { Schema, model } = require('mongoose');

const estadisticasNivelesSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true,
    },
    glucosa: { type: Number, required: true },
    trigliceridos: { type: Number, required: true },
    colesterolTotal: { type: Number, required: true },
    colesterolLDL: { type: Number, required: true },
    colesterolHDL: { type: Number, required: true },
    nivelesGlucosa: { type: Number },
    nivelesTrigliceridos: { type: Number },
    nivelesColesterolTotal: { type: Number },
    nivelesColesterolLDL: { type: Number },
    nivelesHDL: { type: Number },
  },
  {
    timestamps: true,
  }
);

estadisticasNivelesSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

estadisticasNivelesSchema.set('toJSON', {
  virtuals: true,
});

module.exports = model('EstadisticasNiveles', estadisticasNivelesSchema);
