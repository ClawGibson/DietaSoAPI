const { Schema, model } = require('mongoose');

const circunSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true,
        },
        cintura: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false, default: '' },
            },
        ],
        cadera: [
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

circunSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    const { _id: id, ...result } = object;
    return { ...result, id };
});

circunSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

circunSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('CircunferenciasUsuarios', circunSchema);
