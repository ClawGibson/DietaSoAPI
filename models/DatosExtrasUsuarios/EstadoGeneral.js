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
      seHinchan: { type: Boolean, required: false, default: "No" }, //consultamos este para ver si se hinchan llenar lo demas y si no, nada
      aQuehora: { type: String, required: false },
      frecuencia: { type: String, required: false },
      horasSentado: { type: String, required: false },
      horasParado: { type: String, required: false },
    },
    nariz: {
      sangradoDe: { type: Boolean, required: false, default: false },
      frecuenciaDe: { type: String, required: false },
    },
    piel: {
      manchasRojasMoretes: { type: Boolean, required: false, default: false },
      frecuenciaDeEllo: { type: String, required: false },
    },
    unas: {
      //uñas
      quebradizas: { type: Boolean, required: false, default: false },
      frecuencia: { type: String, required: false },
    },
    cabello: {
      caidaDeCabello: { type: Boolean, required: false, default: false },
      cabelloQuebradizo: { type: Boolean, required: false, default: false },
      cabelloTenidoOTratamiento: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    boca: {
      cortadurasEnComisuras: { type: Boolean, required: false },
      frecuencia: { type: String, required: false },
      inflamacionDeLengua: { type: Boolean, required: false },
      frecuenciaDe: { type: String, required: false },
      inflamacionEncias: { type: Boolean, required: false },
      frecuenciaDeIE: { type: String, required: false },
      sangradoEncias: { type: Boolean, required: false },
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
