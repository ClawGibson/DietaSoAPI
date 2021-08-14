const { Schema, model } = require("mongoose");

const usuariosSchema = new Schema(
  {
    usuario: { type: String, required: false },
    //nombre: { type: String, required: true },
    email: { type: String, required: true },
    contrasena: { type: String, required: true },
    esAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

usuariosSchema.virtual("id").get(function () {
  return this._id.toHexStr
  ing();
});

usuariosSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("Usuarios", usuariosSchema);
