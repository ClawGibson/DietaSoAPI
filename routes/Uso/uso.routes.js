const UsoApp = require('../../models/Uso/uso');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const registros = await UsoApp.find().populate('usuario', {
            nombre: 1,
            apellidoPaterno: 1,
        });

        if (!registros)
            return res.status(204).send({ message: 'No hay registros' });

        return res.status(200).send(registros);
    } catch (error) {
        return res.status(500).send({
            message:
                'Ocurrió un error al obtener los registros de uso de la aplicación',
            error,
        });
    }
});

router.get('/individual', async (req, res) => {
    try {
        const { usuario } = req.query;

        const registros = await UsoApp.find({ usuario: usuario }).populate(
            'usuario'
        );

        if (!registros)
            return res.status(204).send({ message: 'No hay registros' });

        return res.status(200).send(registros);
    } catch (error) {
        return res.status(500).send({
            message:
                'Ocurrió un error al obtener los registros de uso de la aplicación de un usuario',
            error,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { usuario, fechaInicial, fechaFinal, estado } = req.body;

        const registro = new UsoApp({
            usuario,
            fechaInicial,
            fechaFinal,
            estado,
        });

        const registroGuardado = await registro.save();

        if (!registroGuardado)
            return res.status(400).send({
                message: 'No se pudo guardar el registro',
            });

        return res.status(200).send(registroGuardado);
    } catch (error) {
        return res.status(500).send({
            message:
                'Ocurrió un error al crear los registros de uso de la aplicación',
            error,
        });
    }
});

module.exports = router;
