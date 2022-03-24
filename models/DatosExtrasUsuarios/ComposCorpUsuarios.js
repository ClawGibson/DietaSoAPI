const { Schema, model } = require('mongoose');

const cCUsuariosSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true,
        },
        porcentGrasa: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
        porcentMasa: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
        porcentAgua: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
        densidadOsea: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
        grasaVisceral: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
        tasaMetabolica: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
        edadMetabolica: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
    },
    {
        timestamps: true,
    }
);

cCUsuariosSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    const { _id: id, ...result } = object;
    return { ...result, id };
});

cCUsuariosSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cCUsuariosSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('ComposCorpUsuarios', cCUsuariosSchema);
