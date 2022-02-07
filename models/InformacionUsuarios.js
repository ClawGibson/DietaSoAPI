const { Schema, model } = require('mongoose');

const informacionUsuariosSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true,
        },
        nombre: { type: String, required: true },
        apellidoPaterno: { type: String, required: true },
        apellidoMaterno: { type: String, required: true },
        foto: { type: String, required: false },
        delete_token: { type: String, required: false },
        fechaDeNacimiento: { type: String, required: true },
        genero: { type: String, required: true },
        celular: { type: String, required: false },
        paisDeNacimiento: { type: String, required: false },
        estadoDeNacimiento: { type: String, required: false },
        ciudadDeResidencia: { type: String, required: false },
        tiempoViviendoAhi: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

informacionUsuariosSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

informacionUsuariosSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('InformacionUsuarios', informacionUsuariosSchema);
