const mongoose = require("mongoose");

const AlimentacionUsuariosSchema = new mongoose.Schema(
  {
    comidaFavorita: [String],
    comidaNoFavorita: [String],
    alergiasAlimentarias: [String],
    lugarDeCompras: [String],
    quienCocina: [String],
    estatusDieta: {
      sigueDieta: { type: String, required: false },
      conNutriologo: { type: Number, required: false },
    },
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

alimentacionUsuariosSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

alimentacionUsuariosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

alimentacionUsuariosSchema.set("toJSON", {
  virtuals: true,
});

exports.AlimentacionUsuarios = mongoose.model(
  "AlimentacionUsuarios",
  alimentacionusuariosSchema
);
exports.alimentacionUsuariosSchema = alimentacionusuariosSchema;
