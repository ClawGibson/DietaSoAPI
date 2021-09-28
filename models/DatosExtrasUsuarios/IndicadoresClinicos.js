const { Schema, model } = require("mongoose");

const indicadoresCliSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "Usuarios", required: true },
    presionArterial: { type: String, required: false },
    acantosisNigricans: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

indicadoresCliSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

indicadoresCliSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

indicadoresCliSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("IndicadoresClinicos", indicadoresCliSchema);
