const mongoose = require("mongoose");

const usuariosSchema = new mongoose.Schema(
  {
    logros: { type: String, required: false },
    nombre: { type: String, required: true },
    apellidoPaterno: { type: String, required: true },
    apellidoMaterno: { type: String, required: true },
    foto: { type: String, required: false },
    email: { type: String, required: true },
    fechaDeNacimiento: { type: String, required: true },
    contrasena: { type: String, required: true },
    genero: { type: String, required: true },
    celular: { type: String, required: false },
    peso: [Number],
    edad: [Number],
    altura: { type: Number, required: true },
    paisDeNacimiento: { type: String, required: false },
    estadoDeNacimiento: { type: String, required: false },
    ciudadDeResidencia: { type: String, required: false },
    tiempoViviendoAhi: { type: String, required: false },
    //actividadFisica: { type: String, required: true },
    actividadFisica: {
      cantidad: { type: String, required: false },
      tipoDeActividad: { type: String, required: false },
      intensidad: { type: String, required: false },
      vecesXsemana: { type: Number, required: false },
      minXdia: { type: Number, required: false },
    },
    historiaClinica: {
      antecedentesPatologicos: [String],
      antecedentesHeredoFamiliares: [String],
      medicamentos: [String],
      suplementos: [String],
    },
    nivelSocioeconomico: {
      ingresosMes: { type: String, required: false },
      educacion: { type: String, required: false },
      ocupacion: { type: String, required: false },
      diasDeTrabajoXsemana: { type: Number, required: false },
      modalidad: { type: String, required: false },
      horarioEntrada: { type: String, required: false },
      horarioSalida: { type: String, required: false },
      dineroDeAlimentacionXmesIndivi: { type: String, required: false },
      dineroDeAlimentacionXmesHogar: { type: String, required: false },
    },
    comidaFavorita: [String],
    comidaNoFavorita: [String],
    alergiasAlimentarias: [String],
    meta: { type: String, required: false },
    esAdmin: { type: Boolean, default: false },
    extras: [String],
    desayuno: [String],
    colacion1: [String],
    comida: [String],
    colacion2: [String],
    cena: [String],
    desayunoAyer: [String],
    colacion1Ayer: [String],
    comidaAyer: [String],
    colacion2Ayer: [String],
    cenaAyer: [String],
  },
  {
    timestamps: true,
  }
);

usuariosSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

usuariosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

usuariosSchema.set("toJSON", {
  virtuals: true,
});

exports.Usuarios = mongoose.model("Usuarios", usuariosSchema);
exports.usuariosSchema = usuariosSchema;
