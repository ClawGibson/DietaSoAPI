const CircunferenciasUsuarios = require('../../models/DatosExtrasUsuarios/CircunferenciasUsuarios');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const listaDSUsuarios = await CircunferenciasUsuarios.find();

        if (listaDSUsuarios.length <= 0) return res.status(204).json([]);

        res.send(listaDSUsuarios);
    } catch (err) {
        console.log('Error al buscar los datos extras del usuario', err);
        return res.status(500).send({
            msg: 'Error al buscar los datos extras del usuario',
            error: err,
        });
    }
});

router.get('/individual', async (req, res) => {
    try {
        const { usuario } = req.query;

        const datosDeUsuario = await CircunferenciasUsuarios.find({
            usuario: usuario,
        });

        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message: 'El usuario no tiene datos de circunferencias todavia',
            });

        res.send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            message: 'Ocurrio un error al guardar los datos de circunferencias',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        const { usuario } = req.query;

        let dCircunferencias = new CircunferenciasUsuarios({
            usuario: usuario,
            cintura: req.body.cintura,
            cadera: req.body.cadera,
        });

        dCircunferencias = await dCircunferencias.save();

        if (!dCircunferencias)
            return res
                .status(400)
                .send('No se pudieron agregar datos de circunferencias');

        res.status(200).send(dCircunferencias);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al guardar los datos de circunferencias',
            error: err,
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const { usuario } = req.query;

        let editarInformacionS = await CircunferenciasUsuarios.findOneAndUpdate(
            { usuario: usuario },
            {
                cintura: {
                    $push: { ...req.body.cintura },
                },
                cadera: {
                    $push: { ...req.body.cadera },
                },
            }
        );

        editarInformacionS = editarInformacionS
            .save()
            .then((response) => res.status(200).json(editarInformacionS))
            .catch((err) =>
                res.status(400).json({
                    success: false,
                    message: 'No se pudo guardar - ',
                    err,
                })
            );
    } catch (err) {
        res.status(500).json({
            success: false,
            message:
                ' Ocurrió un error al actualizar los datos de circunferencias- ',
        });
    }
});

module.exports = router;
