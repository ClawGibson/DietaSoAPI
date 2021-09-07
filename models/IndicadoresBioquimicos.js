const { Schema, model } = require("mongoose");

const iBioquimicosSchema = new Schema(
  {
    usuario: { type: String, required: false },
    glucosaAyuno: { type: String, required: true },
    glucosaDespues: { type: String, required: true },
    trigliceridos: { type: String, required: false },
    colesterolTotal: { type: String, required: false },
    colesterolLDL: { type: String, required: true },
    colesterolHDL: { type: String, required: false },
    microbiotaIntestinal: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

iBioquimicosSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

iBioquimicosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

iBioquimicosSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("ComposCorpUsuarios", iBioquimicosSchema);
