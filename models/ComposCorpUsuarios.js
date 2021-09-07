const { Schema, model } = require("mongoose");

const cCUsuariosSchema = new Schema(
  {
    usuario: { type: String, required: false },
    porcentGrasa: { type: String, required: true },
    porcentMasa: { type: String, required: true },
    porcentAgua: { type: String, required: false },
    densidadOsea: { type: String, required: false },
    grasaVisceral: { type: String, required: true },
    tasaMetabolica: { type: String, required: false },
    edadMetabolica: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

cCUsuariosSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

cCUsuariosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

cCUsuariosSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("ComposCorpUsuarios", cCUsuariosSchema);
