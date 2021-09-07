const { Schema, model } = require("mongoose");

const circunSchema = new Schema(
  {
    usuario: { type: String, required: false },
    cintura: { type: String, required: true },
    cadera: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

circunSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

circunSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

circunSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("CircunferenciasUsuarios", circunSchema);
