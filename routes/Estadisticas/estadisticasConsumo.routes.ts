const express = require('express');
const router = express.Router();
const EstadisticasConsumo = require("../../models/Estadisticas/EstadisticasConsumo");

router.get('/', async (req, res) => {
    try {
        const response = await EstadisticasConsumo.find();

        let status = 200;
        let data = response;

        if (response.length === 0) {
            status = 400;
            data = { success: false, message: 'No se encontraron datos' };
        }

        return res.status(status).send(data);

    } catch (e) {
        return res
            .status(500)
            .send('Error inesperado al obtener las estadisticas Consumo - ', e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await EstadisticasConsumo.find({ usuario: req.params.id });

        let status = 200;
        let data = response;

        if (!response) {
            status = 404;
            data = { success: false, message: 'No se encontraron datos' }
        }

        return res.status(status).send(data);
    } catch (e) {
        return res
            .status(500)
            .send('Error inesperado al obtener la estadistica Consumo - ', e);
    }
});

router.post('/', async (req, res) => {

    let estadisticaConsumo = new EstadisticasConsumo({ ...req.body });

    try {

        estadisticaConsumo = await estadisticaConsumo.save();

        let status = 201;
        let data = estadisticaConsumo;

        if (!estadisticaConsumo) {
            status = 500;
            data = { success: false, message: 'Error al querer guardar la estadistica Consumo' }
        }

        return res.status(status).send(data);

    } catch (e) {
        return res
            .status(500)
            .send('Error inesperado al crear la estadistica Consumo - ', e);
    }

});
router.path('/:id', async (req, res) => {

    //Que datos se van a actualizar
    // frutasVegetales: { type: Number, default: 0 },
    // alimentosMexicanos: { type: Number, default: 0 },
    // cerealesIntegrales: { type: Number, default: 0 },
    // leguminosas: { type: Number, default: 0 },
    // lacteos: { type: Number, default: 0 },
    // semillasGrasasSaludables: { type: Number, default: 0 },
    // huevo: { type: Number, default: 0 },
    // pescadoMariscos: { type: Number, default: 0 },
    // pollo: { type: Number, default: 0 },
    // carnesRojasProcesadas: { type: Number, default: 0 },
    // ultraProcesados: { type: Number, default: 0 },
    // azucar: { type: Number, default: 0 },
    // grasaSaturada: { type: Number, default: 0 },
    // grasaTrans: { type: Number, default: 0 },

});