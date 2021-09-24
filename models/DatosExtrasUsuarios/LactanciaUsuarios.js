const { Schema, model } = require("mongoose");

const lactanciaSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true,
    },
    maternaExclusiva: { type: String, required: false },
    artificial: { type: String, required: false },
    mixta: { type: String, required: false },
    maternaContemplada: { type: String, required: false },
    mixtaContemplada: { type: String, required: false },
    artificialContemplada: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

lactanciaSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

lactanciaSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

lactanciaSchema.set("toJSON", {
  virtuals: true,
});

module.exports = model("LactanciaUsuarios", lactanciaSchema);
