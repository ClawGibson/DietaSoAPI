const { Schema, model } = require('mongoose');

const estadisticasSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true,
    },
    huellaHidricaTotal: { type: Number },
    huellaCarbono: { type: Number },
    puntajeEcologicoSostenible: { type: Number },
    puntosEconomiaFichas: { type: Number },
    peso: { type: Number },
    IMC: { type: Number },
    porcentajeGrasaCorporal: { type: Number },
    porcentajeMasaMuscular: { type: Number },
    consumoFrutasVegetales: { type: Number },
    consumoAlimentosMexicanos: { type: Number },
    consumoCerealesIntegrales: { type: Number },
    consumoLeguminosas: { type: Number },
    consumoLacteos: { type: Number },
    consumoSemillasGrasasSaludables: { type: Number },
    consumoHuevo: { type: Number },
    consumoPescadosMariscos: { type: Number },
    consumoPollo: { type: Number },
    consumoCarnesRojasYProcesadas: { type: Number },
    consumoAzucar: { type: Number },
    consumoGrasaSaturada: { type: Number },
    consumoGrasasTrans: { type: Number },
    realizacionActividadFisicaMinutos: { type: Number },
    nivelesGlucosa: { type: Number },
    nivelesTrigliceridos: { type: Number },
    nivelesColesterolTotal: { type: Number },
    nivelesColesterolLDL: { type: Number },
    nivelesHDL: { type: Number },
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
