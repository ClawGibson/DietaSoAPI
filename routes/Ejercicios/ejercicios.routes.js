const Ejercicios = require('../../models/Ejercicios/Ejercicios');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const ejercicios = await Ejercicios.find();

        if (!ejercicios) {
            return res.status(404).send('No hay ejercicios');
        }

        res.send(ejercicios);
    } catch (error) {
        console.log('Error al obtener los ejercicios.');
        return res.status(500).send({
            success: false,
            message: 'Error al obtener los ejercicios.',
            error: error,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        let ejercicio = new Ejercicios(req.body);
        ejercicio = await ejercicio.save();

        res.send(ejercicio);
    } catch (error) {
        console.log('Error al crear un ejercicio.');
        return res.status(500).send({
            success: false,
            message: 'Error al crear un ejercicio.',
            error: error,
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const ejercicio = await Ejercicios.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        if (!ejercicio) {
            return res.status(404).send('No se encontró el ejercicio');
        }

        res.send(ejercicio);
    } catch (error) {
        console.log('Error al actualizar un ejercicio.');
        return res.status(500).send({
            success: false,
            message: 'Error al actualizar un ejercicio.',
            error: error,
        });
    }
});

module.exports = router;
