const { Schema, model } = require('mongoose');

const lactanciaSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true,
        },
        maternaExclusiva: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],
        artificial: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],
        mixta: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],
        maternaContemplada: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],
        mixtaContemplada: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],
        artificialContemplada: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],
        tiempoLactancia: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],
    },
    {
        timestamps: true,
    }
);

lactanciaSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    const { _id: id, ...result } = object;
    return { ...result, id };
});

lactanciaSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

lactanciaSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('LactanciaUsuarios', lactanciaSchema);
