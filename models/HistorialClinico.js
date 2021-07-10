const mongoose = require("mongoose");

const historialClinicoSchema = new mongoose.Schema(
  {
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

historialClinicoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

historialClinicoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

historialClinicoSchema.set("toJSON", {
  virtuals: true,
});

exports.HistorialClinico = mongoose.model(
  "HistorialClinico",
  historialClinicoSchema
);
exports.historialClinicoSchema = historialClinicoSchema;
