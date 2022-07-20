const LactanciaUsuarios = require('../../models/DatosExtrasUsuarios/LactanciaUsuarios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const listaDSUsuarios = await LactanciaUsuarios.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message: 'No se encontro ninguna información de lactancia de los usuarios',
        });
    res.status(200).send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const datosDeUsuario = await LactanciaUsuarios.findOne({
            usuario: req.query.usuario,
        });

        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message: 'El usuario no tiene datos de lactancia todavia',
            });

        res.status(200).send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            error: err,
            message: 'Ocurrio un error al guardar los datos de lactancia',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        const { usuario } = req.query;

        let dLactancia = new LactanciaUsuarios({
            usuario,
            ...req.body,
        });

        dLactancia = await dLactancia.save();

        if (!dLactancia)
            return res.status(400).send('No se pudieron agregar datos de lactancia');

        res.status(200).send(dLactancia);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al guardar los datos de lactancia',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const { usuario } = req.query;

        let fieldsToPush = {};

        if (req.body.maternaExclusiva)
            fieldsToPush.maternaExclusiva = req.body.maternaExclusiva;
        if (req.body.artificial) fieldsToPush.artificial = req.body.artificial;
        if (req.body.mixta) fieldsToPush.mixta = req.body.mixta;
        if (req.body.mixtaContemplada)
            fieldsToPush.mixtaContemplada = req.body.mixtaContemplada;
        if (req.body.maternaContemplada)
            fieldsToPush.maternaContemplada = req.body.maternaContemplada;
        if (req.body.artificialContemplada)
            fieldsToPush.artificialContemplada = req.body.artificialContemplada;
        if (req.body.tiempoLactancia) fieldsToPush.tiempoLactancia = req.body.tiempoLactancia;

        let lactancia = await LactanciaUsuarios.findOneAndUpdate(
            { usuario },
            {
                $push: fieldsToPush,
            }
        );

        lactancia = await lactancia.save();

        if (!lactancia)
            return res.status(400).send('No se pudieron agregar datos de lactancia');

        res.status(200).send(lactancia);
        return res.status(200).send({ ok: 'ok' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: ' Ocurrió un error al actualizar los datos de lactancia- ',
            err,
        });
    }
});

module.exports = router;
