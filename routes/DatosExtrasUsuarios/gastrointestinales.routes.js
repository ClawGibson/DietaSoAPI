const Usuarios = require('../../models/Usuarios');
const Gastrointestinales = require('../../models/DatosExtrasUsuarios/Gastrointestinales');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const listaDSUsuarios = await Gastrointestinales.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message: 'No se encontro ninguna información gastrointestinal de los usuarios',
        });
    res.status(200).send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const datosDeUsuario = await Gastrointestinales.find({
            usuario: req.query.usuario,
        });

        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message: 'El usuario no tiene datos gastrointestinales todavia',
            });

        res.status(200).send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            error: err,
            message: 'Ocurrio un error al guardar los datos gastrointestinales',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        let dGastrointestinales = new Gastrointestinales({
            usuario: req.query.usuario,
            inflamacionAbdominal: req.body.inflamacionAbdominal,
            diarrea: req.body.diarrea,
            estreñimiento: req.body.estreñimiento,
            reflujo: req.body.reflujo,
        });

        dGastrointestinales = await dGastrointestinales.save();

        if (!dGastrointestinales)
            return res.status(400).send('No se pudieron agregar datos gastrointestinales');

        res.status(200).send(dGastrointestinales);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al guardar los datos gastrointestinales',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const { usuario } = req.query;

        let editarInformacionS = await Gastrointestinales.findOneAndUpdate(
            { usuario: usuario },
            {
                $push: {
                    inflamacionAbdominal: req.body.inflamacionAbdominal,
                    diarrea: req.body.diarrea,
                    estreñimiento: req.body.estreñimiento,
                    reflujo: req.body.reflujo,
                },
            }
        );

        editarInformacionS = await editarInformacionS.save();

        if (!editarInformacionS)
            return res.status(500).send('No se pudo editar la información');

        res.status(200).send(editarInformacionS);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: ' Ocurrió un error al actualizar los datos gastrointestinales- ',
        });
    }
});

module.exports = router;
