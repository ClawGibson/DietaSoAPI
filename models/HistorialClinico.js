const { Schema, model } = require("mongoose");

const historialClinicoSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "Usuarios", required: true },
    historiaClinica: {
      antecedentesPatologicos: [String],
      antecedentesHeredoFamiliares: [{ familiar: String, enfermedad: String }],
      medicamentos: [String],
      suplementos: [{ suplemento: String, marca: String }],
    },
  },
  {
    timestamps: true,
  }
);

historialClinicoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

historialClinicoSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("HistorialClinico", historialClinicoSchema);
