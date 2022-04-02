const { Schema, model } = require('mongoose');

const estadoGeneralSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true,
        },

        muchoCansancio: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],

        mareos: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],

        muchaSed: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],

        muchasGanasDeOrinar: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],

        muchaHambre: [
            {
                fecha: { type: Date, default: Date.now },
                valor: { type: String, required: false },
            },
        ],

        piesYmanos: [
            {
                seHinchan: { type: String, required: false, default: 'No' }, //consultamos este para ver si se hinchan llenar lo demas y si no, nada
                aQuehora: { type: String, required: false, default: 'N/A' },
                frecuencia: { type: String, required: false, default: 'N/A' },
                horasSentado: { type: String, required: false, default: 'N/A' },
                horasParado: { type: String, required: false, default: 'N/A' },
                fecha: { type: Date, default: Date.now },
            },
        ],

        nariz: [
            {
                sangradoDe: { type: String, required: false, default: 'No' },
                frecuenciaDe: { type: String, required: false, default: 'N/A' },
            },
        ],

        piel: [
            {
                manchasRojasMoretes: {
                    type: String,
                    required: false,
                    default: 'No',
                },
                frecuenciaDeEllo: {
                    type: String,
                    required: false,
                    default: 'N/A',
                },
                fecha: { type: Date, default: Date.now },
            },
        ],

        unas: [
            {
                //uñas
                quebradizas: { type: String, required: false, default: 'No' },
                frecuencia: { type: String, required: false, default: 'N/A' },
                fecha: { type: Date, default: Date.now },
            },
        ],

        cabello: [
            {
                caidaDeCabello: {
                    type: String,
                    required: false,
                    default: 'No',
                },
                cabelloQuebradizo: {
                    type: String,
                    required: false,
                    default: 'No',
                },
                cabelloTenidoOTratamiento: {
                    type: String,
                    required: false,
                    default: 'No',
                },
                fecha: { type: Date, default: Date.now },
            },
        ],

        boca: [
            {
                cortadurasEnComisuras: {
                    type: String,
                    required: false,
                    default: 'No',
                },
                frecuencia: { type: String, required: false },
                inflamacionDeLengua: {
                    type: String,
                    required: false,
                    default: 'No',
                },
                frecuenciaDe: { type: String, required: false },
                inflamacionEncias: {
                    type: String,
                    required: false,
                    default: 'No',
                },
                frecuenciaDeIE: { type: String, required: false },
                sangradoEncias: {
                    type: String,
                    required: false,
                    default: 'No',
                },
                frecuenciaDeSE: { type: String, required: false },
                fecha: { type: Date, default: Date.now },
            },
        ],

        tipoDeNacimiento: { type: String, required: false }, //cesarea, parto vaginal
    },
    {
        timestamps: true,
    }
);

estadoGeneralSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    const { _id: id, ...result } = object;
    return { ...result, id };
});

estadoGeneralSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

estadoGeneralSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('EstadoGeneral', estadoGeneralSchema);
