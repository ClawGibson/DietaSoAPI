const { Schema, model } = require("mongoose");

const alimentacionUsuariosSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "Usuarios", required: false },
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

alimentacionUsuariosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

alimentacionUsuariosSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("AlimentacionUsuarios", alimentacionUsuariosSchema);
