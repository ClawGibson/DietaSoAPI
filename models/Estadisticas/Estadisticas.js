const { Schema, model } = require('mongoose');

const estadisticasSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true,
    },
    
    //Mover a estadisticas IMC y en rutas
    realizacionActividadFisicaMinutos: { type: Number },

    //Separar en un archivo diferente
    nivelesGlucosa: { type: Number },
    nivelesTrigliceridos: { type: Number },
    nivelesColesterolTotal: { type: Number },
    nivelesColesterolLDL: { type: Number },
    nivelesHDL: { type: Number },

    //Separar en un archivo diferente
    presionArterialSistolica: { type: Number },
    presionArterialDiastolica: { type: Number }
  },
  {
    timestamps: true,
  }
);

estadisticasSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

estadisticasSchema.set('toJSON', {
  virtuals: true,
});

module.exports = model('Estadisticas', estadisticaschema);
