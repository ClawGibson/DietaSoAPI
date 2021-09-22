const { Schema, model } = require("mongoose");

const gastroiSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true,
    },
    inflamacionAbdominal: {
      estado: { type: Boolean, required: false },
      frecuencia: { type: String, required: false },
    },
    diarrea: {
      estado: { type: Boolean, required: false }, //consultamos este para ver si se hinchan llenar lo demas y si no, nada
      frecuencia: { type: String, required: false, default: "" }, //para respuestas secundarias
    },
    estreñimiento: {
      estado: { type: Boolean, required: false },
      frecuencia: { type: String, required: false },
    },
    reflujo: {
      estado: { type: Boolean, required: false },
      frecuencia: { type: String, required: false },
    },
  },
  {
    timestamps: true,
  }
);

gastroiSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

gastroiSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

gastroiSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("Gastrointestinales", gastroiSchema);
