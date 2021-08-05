const { Schema, model } = require('mongoose');

const registroDieteticoSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    agua: { type: Number, required: false },
    ejercicio: [
      {
        duracion: { type: Number, required: false },
        intensidad: { type: Number, required: false },
      },
    ],
    alimentos: [
      {
        idAlimento: {
          type: Schema.Types.ObjectId,
          ref: 'Alimentos',
          required: true,
        },
        cantidad: { type: String, required: true },
        tipo: { type: String, required: true }, // Desayuno, comida, cena, colación.
        fecha: { type: Date, required: true },
        lugar: { type: String, required: false },
        menuPreparacion: { type: String, required: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

registroDieteticoSchema.virtual('id').get(() => {
  return this._id.toHexString();
});

registroDieteticoSchema.set('toJSON', {
  virtuals: true,
});

module.exports = model('RegistroDietetico', registroDieteticoSchema);
