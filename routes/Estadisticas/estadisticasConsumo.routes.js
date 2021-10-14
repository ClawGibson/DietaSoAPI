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

    try {

        let estadisticaConsumo = await EstadisticasConsumo.find({ usuario: req.params.id });


        if (estadisticaConsumo.length <= 0)
            return res.status(404).send({
                success: false,
                message: 'No se encontraron datos',
            });

        estadisticaConsumo = new EstadisticasConsumo({ ...req.body });

        estadisticaConsumo = await estadisticaConsumo.save();

        if (!estadisticaConsumo)
            return res.status(500).send({
                success: false,
                message: 'Error al querer guardar la estadistica Consumo',
            });

        return res.status(200).send(estadisticaConsumo);

    } catch (e) {
        return res
            .status(500)
            .send('Error inesperado al actualizar la estadistica Consumo - ', e);
    }

});

module.exports = router;