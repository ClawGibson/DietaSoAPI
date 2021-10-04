const { Schema, model } = require('mongoose');

const alimentosSchema = new Schema(
    {
        nombreAlimento: { type: String, required: true },
        sku: { type: String, required: true },
        imagen: { type: String, required: false, default: '' },
        grupoExportable: { type: String, required: false, default: '' },
        subGrupoExportable: { type: String, required: false, default: '' },
        clasificacionExportable: { type: String, required: false, default: '' },
        grupoAlimento: { type: String, required: true },
        mensaje: [
            {
                nutricional: { type: String, required: false, default: '' },
                ambiental: { type: String, required: false, default: '' },
                mensajeEconomia: { type: String, required: false, default: '' },
                mensajeCulturaSociedad: {
                    type: String,
                    required: false,
                    default: '',
                },
            },
        ],
        icono: [
            {
                iconoNutricional: {
                    type: String,
                    required: false,
                    default: '',
                },
                iconoAmbiental: { type: String, required: false, default: '' },
                iconoEconomia: { type: String, required: false, default: '' },
                iconoCulturaSociedad: {
                    type: String,
                    required: false,
                    default: '',
                },
            },
        ],
        opcionesPreparacion: { type: String, required: false, default: '' },
        cantidadAlimento: [
            {
                cantidadSugerida: { Number, required: false, default: 0 },
                unidad: { type: String, required: false, default: '' },
                pesoNeto: { type: String, required: false, default: '' },
            },
        ],
        caloriasMacronutrientes: [
            {
                energia: { type: String, required: false, default: '' },
                proteina: { type: String, required: false, default: '' },
                lipidos: { type: String, required: false, default: '' },
                agSaturados: { type: String, required: false, default: '' },
                agMonoinsaturados: {
                    type: String,
                    required: false,
                    default: '',
                },
                adPoliinsaturados: {
                    type: String,
                    required: false,
                    default: '',
                },
                colesterol: { type: String, required: false, default: '' },
                omega3: { type: String, required: false, default: '' },
                omega6: { type: String, required: false, default: '' },
                omega9: { type: String, required: false, default: '' },
                hidratosDeCarbono: {
                    type: String,
                    required: false,
                    default: '',
                },
                fibra: { type: String, required: false, default: '' },
                fibraInsoluble: { type: String, required: false, default: '' },
                azucar: { type: String, required: false, default: '' },
                etanol: { type: String, required: false, default: '' },
            },
        ],
        vitaminas: [
            {
                tiamina: { type: String, required: false, default: '' },
                riboflavin: { type: String, required: false, default: '' },
                niacina: { type: String, required: false, default: '' },
                acidoPantotenico: {
                    type: String,
                    required: false,
                    default: '',
                },
                piridoxina: { type: String, required: false, default: '' },
                biotina: { type: String, required: false, default: '' },
                cobalmina: { type: String, required: false, default: '' },
                acidoAscorbico: { type: String, required: false, default: '' },
                acidoFolico: { type: String, required: false, default: '' },
                vitaminaA: { type: String, required: false, default: '' },
                vitaminaD: { type: String, required: false, default: '' },
                vitaminaK: { type: String, required: false, default: '' },
                vitaminaE: { type: String, required: false, default: '' },
            },
        ],
        minerales: [
            {
                calcio: { type: String, required: false, default: '' },
                fosforo: { type: String, required: false, default: '' },
                hierro: { type: String, required: false, default: '' },
                hierroNoHem: { type: String, required: false, default: '' },
                hierroTotal: { type: String, required: false, default: '' },
                magnesio: { type: String, required: false, default: '' },
                sodio: { type: String, required: false, default: '' },
                potasio: { type: String, required: false, default: '' },
                zinc: { type: String, required: false, default: '' },
                selenio: { type: String, required: false, default: '' },
            },
        ],
        aspectoGlucemico: [
            {
                indiceGlicemico: { type: String, required: false, default: '' },
                cargaGlicemica: { type: String, required: false, default: '' },
            },
        ],
        aspectoMedioambiental: [
            {
                factorDeCorreccionParaHuellaHidricaYEGEI: {
                    Number,
                    required: false,
                    default: 0,
                },
                tipo: { type: String, required: false, default: '' },
                lugar: { type: String, required: false, default: '' },
                huellaHidricaTotal: {
                    type: String,
                    required: false,
                    default: '',
                },
                huellaHidricaVerde: {
                    type: String,
                    required: false,
                    default: '',
                },
                huellaHidricaAzul: {
                    type: String,
                    required: false,
                    default: '',
                },
                huellaHidricaGris: {
                    type: String,
                    required: false,
                    default: '',
                },
                aguaParaLavado: { type: String, required: false, default: '' },
                aguaParaCoccion: { type: String, required: false, default: '' },
                lugarEGEI: { type: String, required: false, default: '' },
                citaEGEI: { type: String, required: false, default: '' },
                huellaCarbono: { type: String, required: false, default: '' }, // EGEI.
                huellaEcologica: { type: String, required: false, default: '' },
                energiaFosil: { type: String, required: false, default: '' },
                usoDeSuelo: { type: String, required: false, default: '' },
                nitrogeno: { type: String, required: false, default: '' },
                fosforo: { type: String, required: false, default: '' },
                puntajeEcologico: { Number, required: false, default: 0 },
            },
        ],
        aspectoEconomico: [
            {
                precio: { Number, required: false, default: 0 },
                lugarDeCompra: { type: String, required: false, default: '' },
                lugarDeVenta: { type: String, required: false, default: '' },
            },
        ],
        componentesBioactivos: [
            {
                fitoquimicos: { type: String, required: false, default: '' },
                polifenoles: { type: String, required: false, default: '' },
                antocianinas: { type: String, required: false, default: '' },
                taninos: { type: String, required: false, default: '' },
                isoflavonas: { type: String, required: false, default: '' },
                resveratrol: { type: String, required: false, default: '' },
                isotiocinatos: { type: String, required: false, default: '' },
                caretenoides: { type: String, required: false, default: '' },
                betacarotenos: { type: String, required: false, default: '' },
                licopeno: { type: String, required: false, default: '' },
                luteina: { type: String, required: false, default: '' },
                alicina: { type: String, required: false, default: '' },
                cafeina: { type: String, required: false, default: '' },
                UFC: { type: String, required: false, default: '' },
            },
        ],
        aditivosAlimentarios: [
            {
                benzoatoDeSodio: { type: String, required: false, default: '' },
                polisorbato: { type: String, required: false, default: '' },
                azulBrillanteFCFoE133: {
                    type: String,
                    required: false,
                    default: '',
                },
                azurrubinaOE102: { type: String, required: false, default: '' },
                amarilloOcasoFDFoE110: {
                    type: String,
                    required: false,
                    default: '',
                },
                tartrazinaOE102: { type: String, required: false, default: '' },
                verdeSoE142: { type: String, required: false, default: '' },
                negroBrillanteBNoE151: {
                    type: String,
                    required: false,
                    default: '',
                },
                sucralosa: { type: String, required: false, default: '' },
                estevia: { type: String, required: false, default: '' },
                sacarina: { type: String, required: false, default: '' },
                aspartame: { type: String, required: false, default: '' },
                acesulfameK: { type: String, required: false, default: '' },
                carboxymethylcellulose: {
                    type: String,
                    required: false,
                    default: '',
                },
                dioxidoDeTitanio: {
                    type: String,
                    required: false,
                    default: '',
                },
                monolauratoDeGlicerol: {
                    type: String,
                    required: false,
                    default: '',
                },
            },
        ],
        atributosAdicionales: [
            {
                atributoAdicional: {
                    type: String,
                    required: false,
                    default: '',
                },
            },
        ],
        marca: { type: String, required: false, default: '' },
    },
    {
        timestamps: true,
    }
);

alimentosSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

alimentosSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('Alimentos', alimentosSchema);
