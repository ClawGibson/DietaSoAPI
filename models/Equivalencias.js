const { Schema, model } = require('mongoose');

const equivalenciasSchema = new Schema({
  alimento: { type: String, required: true },
  cantidadSugerida: { type: String, required: true },
  unidad: { type: String, required: true },
  pesoNetoKg: { type: String, required: true },
});

equivalenciasSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

equivalenciasSchema.set('toJSON', {
  virtuals: true,
});

module.exports = model('Equivalencias', equivalenciasSchema);
