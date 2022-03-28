const { Schema, model } = require('mongoose');

const datosUsuariosSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true,
        },
        actividadFisica: {
            tipoDeActividad: { type: String, required: false },
            intensidad: { type: String, required: false },
            vecesXsemana: { type: String, required: false },
            minXdia: { type: String, required: false },
        },
        peso: [{ type: Number, required: true }],
        registroPeso: [{ type: Date, default: Date.now }],
        altura: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

datosUsuariosSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

datosUsuariosSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('DatosUsuarios', datosUsuariosSchema);
