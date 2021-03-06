const ComposCorpUsuarios = require('../../models/DatosExtrasUsuarios/ComposCorpUsuarios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const listaDSUsuarios = await ComposCorpUsuarios.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message:
                'No se encontro ninguna información de composición corporal de los usuarios',
        });
    res.send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const datosDeUsuario = await ComposCorpUsuarios.find({
            usuario: req.query.usuario,
        });

        if (!datosDeUsuario)
            return res.status(204).send({
                success: true,
                message: 'El usuario no tiene datos de composición corporal todavia',
            });

        res.status(200).send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            error: err,
            message: 'Ocurrio un error al guardar los datos de composición corporal',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        let dComposCorp = new ComposCorpUsuarios({
            usuario: req.query.usuario,
            porcentGrasa: req.body.porcentGrasa,
            porcentMasa: req.body.porcentMasa,
            porcentAgua: req.body.porcentAgua,
            densidadOsea: req.body.densidadOsea,
            grasaVisceral: req.body.grasaVisceral,
            tasaMetabolica: req.body.tasaMetabolica,
            edadMetabolica: req.body.edadMetabolica,
        });

        dComposCorp = await dComposCorp.save();

        if (!dComposCorp)
            return res
                .status(400)
                .send('No se pudieron agregar datos de composición corporal');
        res.status(200).send(dComposCorp);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al guardar los datos de composición corporal',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        let editarInformacionS = await ComposCorpUsuarios.findOneAndUpdate(
            { usuario: req.query.usuario },
            {
                $push: {
                    porcentGrasa: req.body.porcentGrasa,
                    porcentMasa: req.body.porcentMasa,
                    porcentAgua: req.body.porcentAgua,
                    densidadOsea: req.body.densidadOsea,
                    grasaVisceral: req.body.grasaVisceral,
                    tasaMetabolica: req.body.tasaMetabolica,
                    edadMetabolica: req.body.edadMetabolica,
                },
            }
        );

        editarInformacionS = await editarInformacionS.save();

        if (!editarInformacionS)
            return res.status(500).json({
                success: false,
                message: 'No se pudo guardar',
            });

        res.status(200).send(editarInformacionS);
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err,
            message: ' Ocurrió un error al actualizar los datos de composición corporal- ',
        });
    }
});

module.exports = router;
