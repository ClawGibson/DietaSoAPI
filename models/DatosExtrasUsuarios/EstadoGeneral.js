const { Schema, model } = require("mongoose");

const estadoGeneralSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true,
    },
    muchoCansancio: { type: String, required: true },
    mareos: { type: String, required: false, default: "No" },
    muchaSed: { type: String, required: false, default: "No" },
    muchasGanasDeOrinar: { type: String, required: false, default: "No" },
    muchaHambre: { type: String, required: false, default: "No" },
    piesYmanos: {
      seHinchan: { type: String, required: false, default: "No" }, //consultamos este para ver si se hinchan llenar lo demas y si no, nada
      aQuehora: { type: String, required: false },
      frecuencia: { type: String, required: false },
      horasSentado: { type: String, required: false },
      horasParado: { type: String, required: false },
    },
    nariz: {
      sangradoDe: { type: String, required: false, default: "No" },
      frecuenciaDe: { type: String, required: false },
    },
    piel: {
      manchasRojasMoretes: { type: String, required: false, default: "No" },
      frecuenciaDeEllo: { type: String, required: false },
    },
    unas: {
      //uñas
      quebradizas: { type: String, required: false, default: "No" },
      frecuencia: { type: String, required: false },
    },
    cabello: {
      caidaDeCabello: { type: String, required: false, default: "No" },
      cabelloQuebradizo: { type: String, required: false, default: "No" },
      cabelloTenidoOTratamiento: {
        type: String,
        required: false,
        default: "No",
      },
    },
    boca: {
      cortadurasEnComisuras: { type: String, required: false, default: "No" },
      frecuencia: { type: String, required: false },
      inflamacionDeLengua: { type: String, required: false, default: "No" },
      frecuenciaDe: { type: String, required: false },
      inflamacionEncias: { type: String, required: false, default: "No" },
      frecuenciaDeIE: { type: String, required: false },
      sangradoEncias: { type: String, required: false, default: "No" },
      frecuenciaDeSE: { type: String, required: false },
    },
    tipoDeNacimiento: { type: String, required: false }, //cesarea, parto vaginal
  },
  {
    timestamps: true,
  }
);

estadoGeneralSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

estadoGeneralSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

estadoGeneralSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("EstadoGeneral", estadoGeneralSchema);
