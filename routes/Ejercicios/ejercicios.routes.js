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

router.get('/:ejercicio', async (req, res) => {
    try {
        const { ejercicio } = req.params;

        const ejercicioEncontrado = await Ejercicios.find({
            nombre: ejercicio,
        });

        if (!ejercicioEncontrado) {
            return res.status(404).send('No hay ejercicio');
        }

        res.send(ejercicioEncontrado);
    } catch (error) {
        console.log('Error al obtener el ejercicio buscado');
        return res.status(500).send({
            success: false,
            message: 'Error al obtener el ejercicio buscado',
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

router.delete('/:id', async (req, res) => {
    try {
        const ejercicio = await Ejercicios.findByIdAndDelete(req.params.id);

        if (!ejercicio) {
            return res.status(404).send('No se encontró el ejercicio');
        }

        res.status(200).send({ success: true, message: 'Ejercicio eliminado' });
    } catch (error) {
        console.log('Error al eliminar un ejercicio.');
        return res.status(500).send({
            success: false,
            message: 'Error al eliminar un ejercicio.',
            error: error,
        });
    }
});

module.exports = router;
