const mongoose = require("mongoose");

const usuariosSchema = new mongoose.Schema(
  {
    logros: { type: String, required: false },
    email: { type: String, required: true },
    contrasena: { type: String, required: true },
    esAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

usuariosSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

usuariosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

usuariosSchema.set("toJSON", {
  virtuals: true,
});

exports.Usuarios = mongoose.model("Usuarios", usuariosSchema);
exports.usuariosSchema = usuariosSchema;
