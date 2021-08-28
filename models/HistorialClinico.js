const { Schema, model } = require("mongoose");

const historialClinicoSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "Usuarios", required: false },
    historiaClinica: {
      antecedentesPatologicos: [String],
      antecedentesHeredoFamiliares: [String],
      medicamentos: [String],
      suplementos: [String],
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
