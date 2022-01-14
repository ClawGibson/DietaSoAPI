const { Schema, model } = require('mongoose');

const cCUsuariosSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true,
        },
        porcentGrasa: [{ type: String, required: false, default: '' }],
        porcentMasa: [{ type: String, required: false, default: '' }],
        porcentAgua: [{ type: String, required: false, default: '' }],
        densidadOsea: [{ type: String, required: false, default: '' }],
        grasaVisceral: [{ type: String, required: false, default: '' }],
        tasaMetabolica: [{ type: String, required: false, default: '' }],
        edadMetabolica: [{ type: String, required: false, default: '' }],
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
