const { Schema, model } = require("mongoose");

const informacionUsuariosSchema = new mongoose.Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "Usuarios", required: true },
    nombre: { type: String, required: true },
    apellidoPaterno: { type: String, required: true },
    apellidoMaterno: { type: String, required: true },
    foto: { type: String, required: false },
    fechaDeNacimiento: { type: String, required: true },
    genero: { type: String, required: true },
    celular: { type: String, required: false },
    //edad: [Number],
    paisDeNacimiento: { type: String, required: false },
    estadoDeNacimiento: { type: String, required: false },
    ciudadDeResidencia: { type: String, required: false },
    tiempoViviendoAhi: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

informacioUsuariosSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

informacioUsuariosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

informacionUsuariosSchema.set("toJSON", {
  virtuals: true,
});

exports.InformacionUsuarios = mongoose.model(
  "InformacionUsuarios",
  informacionUsuariosSchema
);
exports.informacionUsuariosSchema = informacionUsuariosSchema;
