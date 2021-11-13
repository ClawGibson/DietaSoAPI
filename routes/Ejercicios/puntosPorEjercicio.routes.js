const PuntosPorEjercicio = require('../../models/Ejercicios/PuntosPorEjercicio');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const { nombreEjercicio, grupo, duracion, intensidad } = req.query;

        const puntosPorEjercicio = await PuntosPorEjercicio.find({
            ejercicio: nombreEjercicio,
            grupo: grupo,
            duracion: duracion,
            intensidad: intensidad,
        });

        if (!puntosPorEjercicio) {
            res.status(404).json({
                message: 'No se encontraron puntos por ejercicio',
            });
        }

        res.status(200).send(puntosPorEjercicio);
    } catch (error) {
        console.log('Error al obtener los puntos por ejercicio');
        return res.status(500).send({
            success: false,
            message: 'Error al obtener los puntos por ejercicio',
            error: error,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        let puntos = new PuntosPorEjercicio(req.body);

        puntos = await puntos.save();

        if (!puntos) {
            res.status(500).json({
                message: 'No se pudo guardar los puntos por ejercicio',
            });
        }

        res.status(200).send(puntos);
    } catch (error) {
        console.log('Error al crear un registro en puntos por ejercicio');
        return res.status(500).send({
            success: false,
            message: 'Error al crear un registro en puntos por ejercicio',
            error: error,
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        let puntos = await PuntosPorEjercicio.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!puntos) {
            res.status(404).json({
                message: 'No se encontraron puntos por ejercicio',
            });
        }

        res.status(200).send(puntos);
    } catch (error) {
        console.log('Error al actualizar los puntos por ejercicio');
        return res.status(500).send({
            success: false,
            message: 'Error al actualizar los puntos por ejercicio',
            error: error,
        });
    }
});

module.exports = router;
