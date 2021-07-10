const mongoose = require("mongoose");

const datosUsuariosSchema = new mongoose.Schema(
  {
    peso: [Number],
    altura: { type: Number, required: true },
    actividadFisica: {
      tipoDeActividad: { type: String, required: false },
      intensidad: { type: String, required: false },
      vecesXsemana: { type: String, required: false },
      minXdia: { type: Number, required: false },
    },
  },
  {
    timestamps: true,
  }
);

datosUsuariosSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

datosUsuariosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

datosUsuariosSchema.set("toJSON", {
  virtuals: true,
});

exports.DatosUsuarios = mongoose.model("DatosUsuarios", datosUsuariosSchema);
exports.datosUsuariosSchema = datosUsuariosSchema;
