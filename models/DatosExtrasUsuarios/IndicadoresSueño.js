const { Schema, model } = require('mongoose');

const iSueñoSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true,
        },
        horasDeSueño: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],
        estadoDeDescanso: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],
        despiertaPorLaNoche: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, default: false, default: 'No' },
            },
        ],
        frecuencia: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, default: '' },
            },
        ],
    },
    {
        timestamps: true,
    }
);

iSueñoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    const { _id: id, ...result } = object;
    return { ...result, id };
});

iSueñoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

iSueñoSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('IndicadoresSueño', iSueñoSchema);
