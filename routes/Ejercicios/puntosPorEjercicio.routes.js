const PuntosPorEjercicio = require('../../models/Ejercicios/PuntosPorEjercicio');
const router = require('express').Router();

router.get('/all', async (req, res) => {
    try {
        const registros = await PuntosPorEjercicio.find().populate('ejercicio');

        if (!registros) {
            res.status(404).send({
                message: 'No se encontraron puntos por ejercicio',
            });
        }

        res.status(200).send(registros);
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error al obtener los puntos por ejercicio',
            error: error,
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const { ejercicio, grupo, duracion, intensidad } = req.query;

        const puntosPorEjercicio = await PuntosPorEjercicio.find({
            ejercicio: ejercicio,
            grupo: grupo,
            duracion: duracion,
            intensidad: intensidad,
        })
            .populate('ejercicio')
            .select('nombre categoria grupo duracion intensidad puntos');

        if (!puntosPorEjercicio) {
            res.status(404).send({
                message: 'No se encontraron puntos del ejercicio proporcionado',
            });
        }

        res.status(200).send(puntosPorEjercicio);
    } catch (error) {
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
            res.status(500).send({
                message: 'No se pudo guardar los puntos por ejercicio',
            });
        }

        res.status(200).send(puntos);
    } catch (error) {
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
            res.status(404).send({
                message: 'No se encontraron puntos por ejercicio',
            });
        }

        res.status(200).send(puntos);
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error al actualizar los puntos por ejercicio',
            error: error,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        let puntos = await PuntosPorEjercicio.findByIdAndDelete(id);

        if (!puntos) {
            res.status(404).send({
                message: 'No se encontraron puntos por ejercicio',
            });
        }

        res.status(200).send(puntos);
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error al eliminar los puntos por ejercicio',
            error: error,
        });
    }
});

module.exports = router;
