const Usuarios = require('../../models/Usuarios');
const IndicadoresBioquimicos = require('../../models/DatosExtrasUsuarios/IndicadoresBioquimicos');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const listaDSUsuarios = await IndicadoresBioquimicos.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message:
                'No se encontro ninguna información de indicadores bioquimicos de los usuarios',
        });
    res.status(200).send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const datosDeUsuario = await IndicadoresBioquimicos.find({
            usuario: req.query.usuario,
        });

        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message: 'El usuario no tiene datos de indicadores bioquimicos todavia',
            });

        res.status(200).send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            error: err,
            message: 'Ocurrio un error al guardar los datos de indicadores bioquimicos',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        let dIndicadoresB = new IndicadoresBioquimicos({
            usuario: req.query.usuario,
            glucosaAyuno: req.body.glucosaAyuno,
            glucosaDespues: req.body.glucosaDespues,
            trigliceridos: req.body.trigliceridos,
            colesterolTotal: req.body.colesterolTotal,
            colesterolLDL: req.body.colesterolLDL,
            colesterolHDL: req.body.colesterolHDL,
            microbiotaIntestinal: req.body.microbiotaIntestinal,
        });

        dIndicadoresB = await dIndicadoresB.save();

        if (!dIndicadoresB)
            return res
                .status(400)
                .send('No se pudieron agregar datos de indicadores bioquimicos');

        res.status(200).send(dIndicadoresB);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al guardar los datos de indicadores bioquimicos',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const { usuario } = req.query;
        const {
            glucosaAyuno,
            glucosaDespues,
            trigliceridos,
            colesterolHDL,
            colesterolLDL,
            colesterolTotal,
            microbiotaIntestinal,
        } = req.body;

        let editarInformacionS = await IndicadoresBioquimicos.findOneAndUpdate(
            { usuario: usuario },
            {
                $push: {
                    glucosaAyuno: glucosaAyuno,
                    glucosaDespues: glucosaDespues,
                    trigliceridos: trigliceridos,
                    colesterolTotal: colesterolTotal,
                    colesterolLDL: colesterolLDL,
                    colesterolHDL: colesterolHDL,
                    microbiotaIntestinal: microbiotaIntestinal,
                },
            }
        );

        editarInformacionS = await editarInformacionS.save();

        if (!editarInformacionS)
            return res.status(500).json({
                success: false,
                message: 'No se pudo guardar - ',
                err,
            });

        res.status(200).send(editarInformacionS);
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err,
            message: ' Ocurrió un error al actualizar los datos de indicadores bioquimicos- ',
        });
    }
});

module.exports = router;
