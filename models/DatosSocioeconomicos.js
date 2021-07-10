const mongoose = require("mongoose");

const datosSocioeconomicosSchema = new mongoose.Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "Usuarios", required: true },
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

datosSocioeconomicosSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

datosSocioeconomicosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

datosSocioeconomicosSchema.set("toJSON", {
  virtuals: true,
});

exports.DatosSocioeconomicos = mongoose.model(
  "DatosSocioeconomicos",
  datosSocioeconomicosSchema
);
exports.datosSocioeconomicosSchema = datosSocioeconomicosSchema;
