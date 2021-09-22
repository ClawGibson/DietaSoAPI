const { Schema, model } = require("mongoose");

const exposicionSSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "Usuarios", required: true },
    minutosAlSol: { type: String, required: false },
    cubresTuPiel: { type: String, required: false }, //con ropa, multiopcion
    bloqueadorSolar: { type: Boolean, required: false },
    diasXsemana: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

exposicionSSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

exposicionSSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

exposicionSSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("ExposicionSolar", exposicionSSchema);
