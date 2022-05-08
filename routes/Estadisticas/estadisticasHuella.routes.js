const express = require('express');
const router = express.Router();
const EstadisticasHuella = require('../../models/Estadisticas/EstadisticasHuella');

router.get('/', async (req, res) => {
    try {
        const response = await EstadisticasHuella.find();

        let status = 200;
        let data = response;

        if (response.length === 0) {
            status = 404;
            data = { success: false, message: 'No se encontraron datos' };
        }

        return res.status(status).send(data);
    } catch (e) {
        return res.status(500).send('Error inesperado al obtener las estadisticas Huella - ', e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await EstadisticasHuella.find({ usuario: req.params.id });

        let status = 200;
        let data = response;

        if (!response) {
            status = 400;
            data = { success: false, message: 'No se encontraron datos' };
        }

        return res.status(status).send(data);
    } catch (e) {
        return res.status(500).send('Error inesperado al obtener la estadistica Huella - ', e);
    }
});

router.post('/', async (req, res) => {
    let estadisitcaHuella = new EstadisticasHuella({ ...req.body });

    try {
        estadisitcaHuella = await estadisticaHuella.save();

        let status = 201;
        let data = estadisitcaHuella;

        if (!estadisitcaHuella) {
            status = 500;
            data = { success: false, message: 'Error al querer guardar la estadistica Huella' };
        }

        return res.status(status).send(data);
    } catch (e) {
        return res.status(500).send('Error inesperado al crear la estadistica Huella - ', e);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        let estadisticaHuella = await EstadisticasHuella.find({ usuario: req.params.id });

        if (estadisticaHuella.length <= 0)
            return res.status(404).send({
                success: false,
                message: 'No se encontraron datos',
            });

        estadisticaHuella = new EstadisiticasHuella({ ...req.body });

        estadisitcaHuella = await estadisiticaHuella.save();

        if (!estadisticaHuella)
            return res.status(500).send({
                success: false,
                message: 'Error al querer guardar la estadistica Huella',
            });

        return res.status(200).send(estadisticaHuella);
    } catch (e) {
        return res.status(500).send('Error inesperado al actualizar la estadistica Huella - ', e);
    }
});

module.exports = router;
