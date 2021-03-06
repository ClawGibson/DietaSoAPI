const { Schema, model } = require('mongoose');

const gastroiSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true,
        },
        inflamacionAbdominal: [
            {
                estado: { type: String, required: false, default: 'No' },
                frecuencia: { type: String, required: false },
                fecha:{ type:Date, default: Date.now},
            },
        ],
        diarrea: [
            {
                estado: { type: String, required: false, default: 'No' }, //consultamos este para ver si se hinchan llenar lo demas y si no, nada
                frecuencia: { type: String, required: false }, //para respuestas secundarias
                fecha:{ type:Date, default: Date.now},
            },
        ],
        estreñimiento: [
            {
                estado: { type: String, required: false, default: 'No' },
                frecuencia: { type: String, required: false },
                fecha:{ type:Date, default: Date.now},
            },
        ],
        reflujo: [
            {
                estado: { type: String, required: false, default: 'No' },
                frecuencia: { type: String, required: false },
                fecha:{ type:Date, default: Date.now},
            },
        ],
    },
    {
        timestamps: true,
    }
);

gastroiSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    const { _id: id, ...result } = object;
    return { ...result, id };
});

gastroiSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

gastroiSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('Gastrointestinales', gastroiSchema);
