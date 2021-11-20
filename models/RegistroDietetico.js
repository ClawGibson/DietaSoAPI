const { Schema, model } = require('mongoose');

const registroDieteticoSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true,
        },
        tipo: { type: String, required: true }, // Desayuno, comida, cena, colación.
        horario: { type: String, required: true },
        menuPreparacion: { type: String, required: false },
        agua: { type: Number, required: false },
        ejercicio: {
            nombres: { type: String, required: false },
            duracion: { type: Number, required: false },
            intensidad: { type: Number, required: false },
        },
        alimentos: [
            {
                idAlimento: {
                    type: Schema.Types.ObjectId,
                    ref: 'Alimentos',
                    required: true,
                },
                cantidad: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

registroDieteticoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

registroDieteticoSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('RegistroDietetico', registroDieteticoSchema);
