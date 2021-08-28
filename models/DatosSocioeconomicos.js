const { Schema, model } = require("mongoose");

const datosSocioeconomicosSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "Usuarios", required: false },
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
  },
  {
    timestamps: true,
  }
);

datosSocioeconomicosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

datosSocioeconomicosSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("DatosSocioeconomicos", datosSocioeconomicosSchema);
