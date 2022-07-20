const { Schema, model } = require('mongoose');

const iBioquimicosSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true,
        },
        glucosaAyuno: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
        glucosaDespues: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
                minutos: { type: String, required: false, default: '' },
            },
        ],
        trigliceridos: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
        colesterolTotal: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
        colesterolLDL: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
        colesterolHDL: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
        microbiotaIntestinal: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
                numero: { type: Number, required: false },
            },
        ],
    },
    {
        timestamps: true,
    }
);

iBioquimicosSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    const { _id: id, ...result } = object;
    return { ...result, id };
});

iBioquimicosSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

iBioquimicosSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('IndicadoresBioquimicos', iBioquimicosSchema);
