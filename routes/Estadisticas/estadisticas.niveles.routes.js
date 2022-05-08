const EstadisticasNiveles = require('../../models/Estadisticas/EstadisticasNiveles');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const niveles = await EstadisticasNiveles.find();

        if (niveles.length === 0) return res.status(404).send({ success: false, message: 'No hay niveles' });

        return res.status(200).send(niveles);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const nivel = await EstadisticasNiveles.find({
            usuario: req.params.id,
        }).populate('usuario', { nombre: 1 });

        if (!nivel) return res.status(404).send({ success: false, message: 'No existe el nivel' });

        return res.status(200).send(nivel);
    } catch (e) {
        return res.status(500).send('Error inesperado al obtener la estadistica IMC - ', e);
    }
});

router.post('/', async (req, res) => {
    try {
        let estadisticaNiveles = new EstadisticasNiveles({
            usuario: req.body.usuario,
            glucosa: req.body.glucosa,
            trigliceridos: req.body.trigliceridos,
            colesterolTotal: req.body.colesterolTotal,
            colesterolLDL: req.body.colesterolLDL,
            colesterolHDL: req.body.colesterolHDL,
        });

        estadisticaNiveles = await estadisticaNiveles.save();

        if (!estadisticaNiveles)
            return res.status(500).json({ success: false, message: 'Error al guardar la estadistica' });

        return res.status(200).send(estadisticaNiveles);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

module.exports = router;
