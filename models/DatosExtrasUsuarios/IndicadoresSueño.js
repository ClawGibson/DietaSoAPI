const { Schema, model } = require("mongoose");

const iSueñoSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true,
    },
    horasDeSueño: { type: String, required: false },
    estadoDeDescanso: { type: String, required: false },
    despiertaPorLaNoche: { type: Boolean, default: false },
    frecuencia: { type: String, default: false },
  },
  {
    timestamps: true,
  }
);

iSueñoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

iSueñoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

iSueñoSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("IndicadoresSueño", iSueñoSchema);
